from typing import Annotated
from datetime import datetime

from vercel.blob import AsyncBlobClient

from models.movies import Movies, Showtimes, Halls, Seats, Reservations, ReservationSeats
from sqlalchemy.orm import Session
from sqlalchemy import select
from dependencies import get_db_session, generate_unique_filename
from security import get_current_user

from fastapi import APIRouter, HTTPException, Form, File, UploadFile, Depends

router = APIRouter(tags=["Movie Reservation System"], prefix="/api/mrs")
ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}

@router.get("/movies")
async def get_movies(session: Annotated[Session, Depends(get_db_session)]):
    movies = session.execute(select(Movies)).scalars().all()
    return movies

@router.post("/add_movie")
async def add_movie(
    title: Annotated[str, Form()],
    description: Annotated[str,Form()],
    poster_image: Annotated[UploadFile, File()],
    genre: Annotated[str, Form()],
    session: Annotated[Session, Depends(get_db_session)]
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

    return {"message": "Movie added", "movie_details": movie}
