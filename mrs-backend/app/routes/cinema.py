from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.dependencies import get_db_session
from app.models.cinema import Halls, Seats

router = APIRouter(
    tags=["Cinema Management"],
    prefix="/api/mrs/cinema",
)


@router.get("/halls")
async def get_halls(
    session: Annotated[Session, Depends(get_db_session)],
):
    statement = select(Halls).order_by(Halls.hall_name)
    halls = session.execute(statement).scalars().all()

    return [
        {
            "hall_id": str(hall.hall_id),
            "hall_name": hall.hall_name,
            "hall_abbrv": hall.hall_abbrv,
            "seats": [
                {
                    "seat_id": str(seat.seat_id),
                    "seat_label": seat.seat_label,
                }
                for seat in session.execute(
                    select(Seats)
                    .where(Seats.hall_id == hall.hall_id)
                    .order_by(Seats.seat_label)
                ).scalars().all()
            ],
        }
        for hall in halls
    ]

# Get all seats
# @router.get("/get-seats")
# def get_seats(session: Annotated[Session, Depends(get_db_session)]):
#     stmt = select(Seats).limit(10)
#     seats = session.execute(stmt).scalars().all()
#     return seats