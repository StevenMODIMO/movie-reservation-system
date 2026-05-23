from fastapi import APIRouter, HTTPException, Form, File, UploadFile, Depends
from typing import Annotated
import uuid
import os
from vercel.blob import AsyncBlobClient
from models.users import User
from sqlmodel import Session, select
from dependencies import get_db_session
from security import hash_password, verify_password, create_access_token, get_current_user, oauth2_scheme
import re
from fastapi.security import OAuth2PasswordRequestForm
from config import settings
from datetime import timedelta

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

    existing_user = session.exec(
    select(User).where(User.email == email)
    ).first()

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
            new_filename,
            content,
            access="public"
        )

        avatar_url = avatar.url

    hashed_password = hash_password(password)

    user = User(email=email, password=hashed_password, username=username, avatar_url=avatar_url)
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return {
        "message": "Account created successfully"
        }

@router.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Annotated[Session, Depends(get_db_session)]
    ):
    statement = select(User).where(User.email == form_data.username)
    user = session.exec(statement).first()
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
        files = await client.list_objects(prefix="mrs/")
        return files
    return { "message": "Resource blocked due to unauthenticated status."}

@router.get("/me")
async def whoami(user: Annotated[User, Depends(get_current_user)]) -> User:
    return user