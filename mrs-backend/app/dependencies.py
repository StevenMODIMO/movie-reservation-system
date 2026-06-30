from database import engine
from sqlalchemy.orm import Session
import os
from fastapi import UploadFile
import uuid

def get_db_session():
    with Session(engine) as session:
        yield session

def generate_unique_filename(file: UploadFile):
    ext = os.path.splitext(file.filename)[1]
    return f"{uuid.uuid4()}{ext}"