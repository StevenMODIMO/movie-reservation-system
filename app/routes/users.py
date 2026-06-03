from typing import Annotated
import uuid
import os
import re
from datetime import timedelta

from vercel.blob import AsyncBlobClient

from models.users import User
from sqlalchemy.orm import Session
from sqlalchemy import select
from dependencies import get_db_session
from security import (
    hash_password, 
    verify_password, 
    create_access_token, 
    get_current_user, 
    oauth2_scheme)

from fastapi import APIRouter, HTTPException, Form, File, UploadFile, Depends
from fastapi.security import OAuth2PasswordRequestForm
from config import settings

router = APIRouter(tags=["User (authentication and authorization)"], prefix="/api/users")

ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}
EMAIL_REGEX = r"^[\w\.-]+@[\w\.-]+\.\w+$"


def generate_unique_filename(file: UploadFile):
    ext = os.path.splitext(file.filename)[1]
    return f"{uuid.uuid4()}{ext}"

@router.post("/signup")
async def signup(
    email: Annotated[str, Form()],
    password: Annotated[str, Form()],
    username: Annotated[str, Form()],
    session: Annotated[Session, Depends(get_db_session)],
    file: Annotated[UploadFile | None, File()] = None
    ):
    if not re.match(EMAIL_REGEX, email):
        raise HTTPException(400,"Invalid email format")

    existing_user = session.execute(
    select(User).where(User.email == email)
    ).scalar_one_or_none()

    if existing_user:
        raise HTTPException(
        status_code=400,
        detail="User with this email already exists"
        )

    avatar_url = "default-avatar.png"

    if file:
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(400, "Invalid file type")

        new_filename = generate_unique_filename(file)
        content = await file.read()

        client = AsyncBlobClient()
        avatar = await client.put(
            f"mrs/profiles/{new_filename}",
            content,
            access="public"
        )

        avatar_url = avatar.url

    hashed_password = hash_password(password)

    user = User(
        email=email, 
        password=hashed_password, 
        username=username, 
        avatar_url=avatar_url
        )
    session.add(user)
    session.commit()
    
    return {
        "message": "Account created successfully"
        }

@router.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Annotated[Session, Depends(get_db_session)]
    ):
    statement = select(User).where(User.email == form_data.username)
    user = session.execute(statement).scalar_one_or_none()
    if not user:
        raise HTTPException(404, "Account not found")
    
    is_password_valid= verify_password(form_data.password, user.password)
    
    if not is_password_valid:
        raise HTTPException(404, "Incorrect password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return { "access_token": access_token, "token_type":"bearer"}

@router.get("/files")
async def get_files(token: Annotated[str, Depends(get_current_user)]):
    if token:
        client = AsyncBlobClient()
        files = await client.list_objects(prefix="mrs/profiles/")
        blob_urls = [blob.pathname for blob in files.blobs]
        return files
    return { "message": "Resource blocked."}

@router.get("/me")
async def whoami(user: Annotated[User, Depends(get_current_user)]):
    return user

@router.delete("/delete-files")
async def delete_blobs(token: Annotated[str, Depends(get_current_user)]):
    if token:
        client = AsyncBlobClient()
        files = await client.list_objects(prefix="mrs/")
        deleted_blobs = await client.delete([blob.pathname for blob in files.blobs])
        return deleted_blobs
    return { "message": "Resource blocked."}