from typing import Annotated
from app.models.reservations import Reservations
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.dependencies import get_db_session
from app.security import require_role

from fastapi import APIRouter, Depends

router = APIRouter(tags=["Reservation Management."], prefix="/api/mrs/reservations")


@router.get("/")
def get_reservations(session: Annotated[Session, Depends(get_db_session)]):
    stmt = select(Reservations)
    reservations = session.execute(stmt).scalars().all()
    return reservations
