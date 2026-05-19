from sqlmodel import create_engine
from config import settings
from models import users

engine = create_engine(settings.DATABASE_URL)