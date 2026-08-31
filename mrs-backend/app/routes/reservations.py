from typing import Annotated
from app.models.reservations import Reservations, ReservationSeats
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.dependencies import get_db_session
from app.security import require_role
from uuid import UUID
from fastapi import APIRouter, Depends, Form

router = APIRouter(tags=["Reservation Management."], prefix="/api/mrs/reservations")


@router.get("/")
def get_reservations(session: Annotated[Session, Depends(get_db_session)]):
    stmt = select(Reservations)
    reservations = session.execute(stmt).scalars().all()
    return reservations


@router.post("/make-reservation")
def make_reservation(
    session: Annotated[Session, Depends(get_db_session)],
    user_id: Annotated[UUID, Form()],
    showtime_id: Annotated[UUID, Form()],
    seat_ids: Annotated[list[UUID], Form()],
):
    reservation = Reservations(user_id=user_id, showtime_id=showtime_id)
    session.add(reservation)
    session.flush()
    for seat_id in seat_ids:
        reservation_seat = ReservationSeats(
            reservation_id=reservation.reservation_id, seat_id=seat_id
        )
        session.add(reservation_seat)
    session.commit()

    return {
        "message": "Reservation made successfully.",
        "reservation_id": reservation.reservation_id,
    }
