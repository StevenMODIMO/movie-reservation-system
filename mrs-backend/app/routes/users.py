from typing import Annotated
import uuid
import os
import re
from datetime import timedelta

from vercel.blob import AsyncBlobClient

from models.users import User
from sqlalchemy.orm import Session
from sqlalchemy import select
from dependencies import get_db_session, generate_unique_filename
from security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    get_current_user,
)

from fastapi import APIRouter, HTTPException, Form, File, UploadFile, Depends
from fastapi.security import OAuth2PasswordRequestForm
from config import settings
import jwt

router = APIRouter(
    tags=["User (authentication and authorization)"], prefix="/api/users"
)

ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}
EMAIL_REGEX = r"^[\w\.-]+@[\w\.-]+\.\w+$"
PASSWORD_REGEX = (
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>/?]).{8,}$"
)


@router.post("/signup")
async def signup(
    session: Annotated[Session, Depends(get_db_session)],
    email: Annotated[str | None, Form()] = None,
    password: Annotated[str | None, Form()] = None,
    username: Annotated[str | None, Form()] = None,
    file: Annotated[UploadFile | None, File()] = None,
):

    if not email or not password or not username:
        raise HTTPException(status_code=400, detail="All fields are required.")

    if email and not re.match(EMAIL_REGEX, email):
        raise HTTPException(400, "Invalid email format.")

    if password and not re.match(PASSWORD_REGEX, password):
        raise HTTPException(400, "Weak password. Include digits and special characters")

    existing_user = session.execute(
        select(User).where(User.email == email)
    ).scalar_one_or_none()

    existing_username = session.execute(
        select(User).where(User.username == username)
    ).scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=400, detail="User with this email already exists."
        )

    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken.")

    avatar_url = "default-avatar.png"

    if file:
        if file.content_type not in ALLOWED_TYPES:
            raise HTTPException(400, "Unsupported file type")

        new_filename = generate_unique_filename(file)
        content = await file.read()

        client = AsyncBlobClient()
        avatar = await client.put(
            f"mrs/profiles/{new_filename}", content, access="public"
        )

        avatar_url = avatar.url

    hashed_password = hash_password(password)

    user = User(
        email=email, password=hashed_password, username=username, avatar_url=avatar_url
    )
    session.add(user)
    session.commit()

    return {"message": "Account created successfully."}


@router.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Annotated[Session, Depends(get_db_session)],
):

    statement = select(User).where(User.email == form_data.username)
    user = session.execute(statement).scalar_one_or_none()

    if not user:
        raise HTTPException(404, "Account not found.")

    is_password_valid = verify_password(form_data.password, user.password)

    if not is_password_valid:
        raise HTTPException(404, "Incorrect password.")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    refresh_token = create_refresh_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post("/refresh")
async def refresh_token(refresh_token: str):
    payload = jwt.decode(
        refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
    )

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    email = payload.get("sub")

    if not email:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    access_token = create_access_token(
        data={"sub": email},
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return {"access_token": access_token, "type": "bearer"}


@router.get("/me")
async def whoami(user: Annotated[User, Depends(get_current_user)]):
    return user
