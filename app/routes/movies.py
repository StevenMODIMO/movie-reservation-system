from typing import Annotated
from datetime import datetime

from vercel.blob import AsyncBlobClient

from models.movies import Movies, Showtimes, Halls, Seats, Reservations, ReservationSeats
from sqlalchemy.orm import Session
from sqlalchemy import select
from dependencies import get_db_session, generate_unique_filename
from security import require_role

from fastapi import APIRouter, HTTPException, Form, File, UploadFile, Depends

router = APIRouter(tags=["Movie Reservation System"], prefix="/api/mrs")
ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}



# ADMIN ROUTES
@router.post("/add-movie")
async def add_movie(
    title: Annotated[str, Form()],
    description: Annotated[str,Form()],
    poster_image: Annotated[UploadFile, File()],
    genre: Annotated[str, Form()],
    session: Annotated[Session, Depends(get_db_session)],
    role= Depends(require_role)
):

    if not title or not description or not genre:
        raise HTTPException(status_code=422, detail="All fields are required")
    
    if not poster_image:
        raise HTTPException(status_code=422, detail="Movie poster is required")
    
    poster_image_url = ""
    
    if poster_image:
        if poster_image.content_type not in ALLOWED_TYPES:
            raise HTTPException(status_code=400,detail="Unsupported file type")
        new_filename = generate_unique_filename(poster_image)
        content = await poster_image.read()

        client = AsyncBlobClient()
        movie_poster_url = await client.put(
            f"mrs/movie-posters/{new_filename}",
            content,
            access="public"
        )

        poster_image_url = movie_poster_url.url
    
    
    movie = Movies(
        title=title,
        description = description,
        poster_image = poster_image_url,
        genre=genre
    )

    session.add(movie)
    session.commit()
    session.refresh(movie)

    return {"message": "Movie added"}

# Get all halls
@router.get("/get-halls")
async def get_halls(
    session: Annotated[Session, Depends(get_db_session)]
):
    statement = select(Halls)
    halls = session.execute(statement).scalars().all()
    return halls

# Create showtime for a movie
@router.post("/create-showtime")
async def create_showtime(
    movie_id: Annotated[str, Form()],
    hall_id: Annotated[str, Form()],
    start_time: Annotated[datetime, Form()],
    end_time: Annotated[datetime, Form()],
    created_at: Annotated[datetime, Form()],
    ticket_price: Annotated[float, Form()],
    session: Annotated[Session, Depends(get_db_session)]
):
# hall = dff299af-0978-42b1-b149-5f3bac86b607
# movie = 7bb71075-d874-4733-8a31-310906d52c6f
    
    showtime = Showtimes(
        movie_id=movie_id,
        hall_id=hall_id,
        start_time=start_time,
        end_time=end_time,
        created_at=created_at,
        ticket_price=ticket_price
    )

    session.add(showtime)
    session.commit()
    session.refresh(showtime)

    return { "message": "Showtime created successfully."}

@router.get("/get-movie-showtime")
async def get_movie_showtime(
    session: Annotated[Session, Depends(get_db_session)]
):
    stmnt = session.execute(select(Movies, Showtimes).join(Movies.showtimes)).all()
    return stmnt


# Choose hall for a specific showtime
@router.post("/choose-hall")
async def choose_hall():
    pass

# USER ROUTES
@router.get("/movies")
async def get_movies(session: Annotated[Session, Depends(get_db_session)]):
    movies = session.execute(select(Movies)).scalars().all()
    return movies

# Choose showtime of a movie

# Select seat for a showtime
