from fastapi import APIRouter, HTTPException, Form, File, UploadFile
from typing import Annotated
import uuid
import os
from vercel.blob import AsyncBlobClient


router = APIRouter(tags=["User (authentication and authorization)"], prefix="/api/users")

ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}

def generate_unique_filename(file: UploadFile):
    ext = os.path.splitext(file.filename)[1]
    return f"{uuid.uuid4()}{ext}"

@router.post("/signup")
async def signup(
    email: Annotated[str, Form()],
    password: Annotated[str, Form()],
    file: Annotated[UploadFile, File()]):

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, "Invalid file type")
    
    new_filename = generate_unique_filename(file)
    content = await file.read()
    
    return {
        "email": email,
        "password": password,
        "file_details": {
            "file_name": new_filename,
            "content_type": file.content_type,
            "file_size": f"{round(file.size / 1024)} KB",
            "file_size_in_mb": f"{round(file.size / (1024 * 1024))} MB",
            "file_extension": f"{os.path.splitext(file.filename)[1]}"
            }}


@router.get("/files")
async def get_files():
    client = AsyncBlobClient()
    files = await client.list_objects(prefix="mrs/")
    return files