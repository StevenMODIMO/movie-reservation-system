from database import engine
from sqlalchemy.orm import Session

def get_db_session():
    with Session(engine) as session:
        yield session