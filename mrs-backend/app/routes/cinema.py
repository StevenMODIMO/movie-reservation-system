from typing import Annotated
from app.models.cinema import Halls, Seats
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.dependencies import get_db_session
from app.security import require_role

from fastapi import APIRouter,Depends

router = APIRouter(tags=["Cinema Management."], prefix="/api/mrs/cinema")

# Get all halls
@router.get("/get-halls")
async def get_halls(session: Annotated[Session, Depends(get_db_session)]):
    statement = select(Halls)
    halls = session.execute(statement).scalars().all()
    return halls

# Get all seats
@router.get("/get-seats")
def get_seats(session: Annotated[Session, Depends(get_db_session)]):
    stmt = select(Seats).limit(10)
    seats = session.execute(stmt).scalars().all()
    return seats