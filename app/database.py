from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase
from config import settings
from models import users

class Base(DeclarativeBase):
    pass

engine = create_engine(settings.DATABASE_URL)
