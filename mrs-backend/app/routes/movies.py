from typing import Annotated
from datetime import datetime, timedelta

from vercel.blob import AsyncBlobClient

from models.movies import Movies, Showtimes, Halls, Seats, Reservations, ReservationSeats
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from dependencies import get_db_session, generate_unique_filename
from security import require_role

from fastapi import APIRouter, HTTPException, Form, File, UploadFile, Depends

router = APIRouter(tags=["Movie Reservation System"], prefix="/api/mrs")
ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}



# ADMIN ROUTES

#Get all movies
@router.get("/movies")
async def get_movies(session: Annotated[Session, Depends(get_db_session)]):
    movies = session.execute(select(Movies)).scalars().all()
    return movies

# Add new movie
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

    try:
        session.add(movie)
        session.commit()
        session.refresh(movie)
        
    except IntegrityError as e:
        session.rollback()
        print(str(e.orig))
        raise HTTPException(
            status_code=400, 
            detail="Database constraint violated"
            )

    return {"message": "Movie added"}

# Update movie details
@router.put("/update-movie/{movie_id}")
async def update_movie(
    movie_id: str,
    session: Annotated[Session, Depends(get_db_session)],
    role = Depends(require_role),
    title: Annotated[str | None, Form()] = None,
    description: Annotated[str| None,Form()] = None,
    poster_image: Annotated[UploadFile| None, File()] = None,
    genre: Annotated[str | None, Form()] = None,    
):
    movie = session.get(Movies, movie_id)

    if not movie:
        raise HTTPException(status_code=404, details="Movie not found")
    
    if title is not None:
        movie.title = title

    if description is not None:
        movie.description = description

    if genre is not None:
        movie.genre = genre

    if poster_image:
        if poster_image.content_type not in ALLOWED_TYPES:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type"
            )

        new_filename = generate_unique_filename(poster_image)
        content = await poster_image.read()

        client = AsyncBlobClient()

        uploaded_image = await client.put(
            f"mrs/movie-posters/{new_filename}",
            content,
            access="public"
        )

        movie.poster_image = uploaded_image.url

    session.commit()
    session.refresh(movie)

    return { "message": f"Movie with id: {movie_id} has been updated"}

# Delete existing movie
@router.delete("/delete-movie/{movie_id}")
async def delete_movie(
    session: Annotated[Session, Depends(get_db_session)],
    movie_id: str
):
    movie = session.get(Movies, movie_id)

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    client = AsyncBlobClient()
    await client.delete(movie.poster_image)
    
    session.delete(movie)
    session.commit()

    return { "message": f"Movie with id: {movie_id} has been deleted."}


# Create showtime for a movie
@router.post("/create-movie-showtime")
async def create_movie_showtime(
    movie_id: Annotated[str, Form()],
    hall_id: Annotated[str, Form()],
    start_time: Annotated[datetime, Form()],
    end_time: Annotated[datetime, Form()],
    created_at: Annotated[datetime, Form()],
    ticket_price: Annotated[float, Form()],
    session: Annotated[Session, Depends(get_db_session)]
):
    if start_time >= end_time:
        raise HTTPException(status_code=400, detail="Start time must be before end time.")

    if (end_time - start_time) < timedelta(hours=1):
        raise HTTPException(
        status_code=400,
        detail="Showtime must be at least 1 hour long"
    )
    
    if end_time <= start_time:
        raise HTTPException(status_code=400, detail="End time must be after start time")

    if start_time.date() != end_time.date():
        raise HTTPException(status_code=400, detail="Showtime must start and end on the same day")
    

    stmt = (
    select(1)
    .where(
        Showtimes.hall_id == hall_id,
        Showtimes.start_time < end_time,
        Showtimes.end_time > start_time
    )
    .limit(1)
)

    result = session.execute(stmt).first()

    if result:
        raise HTTPException(status_code=409, detail="Hall already has a showtime in this range")
    
    try:
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

    except IntegrityError as e:
        session.rollback()
        constraint = getattr(getattr(e.orig, "diag", None), "constraint_name", None)
        if constraint == "unique_showtime":
            raise HTTPException(
            status_code=409,
            detail="This hall already has a showtime at the same start time."
        )
        raise HTTPException(status_code=409, detail=f"Database error of {constraint}")
    finally:
        print("STEVEN PETER MODIMO KINGO'OO.")

# Get movies and their showtimes
@router.get("/get-movie-showtime")
async def get_movie_showtime(
    session: Annotated[Session, Depends(get_db_session)]
):
    rows = session.execute(
        select(Movies, Showtimes).join(Showtimes)
    ).all()

    return [
        {
            "movie": movie.title,
            "showtime_id": showtime.showtime_id,
        }
        for movie, showtime in rows
    ]


# Get all halls
@router.get("/get-halls")
async def get_halls(
    session: Annotated[Session, Depends(get_db_session)]
):
    statement = select(Halls)
    halls = session.execute(statement).scalars().all()
    return halls

# # Choose hall for a specific showtime
# @router.post("/choose-hall")
# async def choose_hall():
#     pass

# # USER ROUTES


# # Choose showtime of a movie

# # Select seat for a showtime
