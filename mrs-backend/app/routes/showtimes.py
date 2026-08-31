from typing import Annotated
from datetime import datetime, timedelta, timezone

from vercel.blob import AsyncBlobClient

from app.models.movies import (
    Movies,
    Showtimes,
)
from app.models.cinema import Halls, Seats
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from app.dependencies import get_db_session, generate_unique_filename
from app.security import require_role
from uuid import UUID

from fastapi import APIRouter, HTTPException, Form, File, UploadFile, Depends

router = APIRouter(tags=["Showtime Management."], prefix="/api/mrs/showtimes")

@router.get("/get-showtimes")
async def get_all_showtimes(session: Annotated[Session, Depends(get_db_session)]):
    showtimes = (
        session.execute(
            select(Movies).options(
                selectinload(Movies.showtimes).selectinload(Showtimes.hall).selectinload(Halls.seats)
            )
        )
        .scalars()
        .all()
    )
    return showtimes

@router.post("/create-movie-showtime")
async def create_movie_showtime(
    movie_id: Annotated[UUID, Form()],
    hall_id: Annotated[UUID, Form()],
    start_time: Annotated[datetime, Form()],
    end_time: Annotated[datetime, Form()],
    created_at: Annotated[datetime, Form()],
    ticket_price: Annotated[float, Form()],
    session: Annotated[Session, Depends(get_db_session)],
    role=Depends(require_role),
):
    if start_time >= end_time:
        raise HTTPException(
            status_code=400, detail="Start time must be before end time."
        )

    if (end_time - start_time) < timedelta(hours=1):
        raise HTTPException(
            status_code=400, detail="Showtime must be at least 1 hour long"
        )

    if start_time < datetime.now(timezone.utc):
        raise HTTPException(
            status_code=400, detail="Showtime must be scheduled for a future time."
        )

    if start_time.date() != end_time.date():
        raise HTTPException(
            status_code=400, detail="Showtime must start and end on the same day"
        )

    stmt = (
        select(1)
        .where(
            Showtimes.hall_id == hall_id,
            Showtimes.start_time < end_time,
            Showtimes.end_time > start_time,
        )
        .limit(1)
    )

    result = session.execute(stmt).first()

    if result:
        raise HTTPException(
            status_code=409, detail="Hall already has a showtime in this range"
        )

    try:
        showtime = Showtimes(
            movie_id=movie_id,
            hall_id=hall_id,
            start_time=start_time,
            end_time=end_time,
            created_at=created_at,
            ticket_price=ticket_price,
        )

        session.add(showtime)
        session.commit()
        session.refresh(showtime)

        return {"message": "Showtime created successfully."}

    except IntegrityError as e:
        session.rollback()
        constraint = getattr(getattr(e.orig, "diag", None), "constraint_name", None)
        if constraint == "unique_showtime":
            raise HTTPException(
                status_code=409,
                detail="This hall already has a showtime at the same start time.",
            )
        raise HTTPException(status_code=409, detail=f"Database error of {constraint}")
    finally:
        print("STEVEN PETER MODIMO KINGO'OO.")