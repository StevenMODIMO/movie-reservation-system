from typing import Annotated

from vercel.blob import AsyncBlobClient

from app.models.movies import Movies
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from app.dependencies import get_db_session, generate_unique_filename
from app.security import require_role
from uuid import UUID

from fastapi import APIRouter, HTTPException, Form, File, UploadFile, Depends

router = APIRouter(tags=["Movie Management."], prefix="/api/mrs/movies")
ALLOWED_TYPES = {"image/png", "image/jpeg", "image/webp", "image/svg+xml"}


# Get all movies
@router.get("/get-all-movies")
async def get_movies(session: Annotated[Session, Depends(get_db_session)]):
    movies = session.execute(select(Movies)).scalars().all()
    return movies


#Get a single movie by id
@router.get("/{movie_id}")
async def get_single_movie(
    movie_id: str, session: Annotated[Session, Depends(get_db_session)]
):
    stmt = select(Movies)
    print(stmt)
    movie = session.get(Movies, movie_id)
    return movie


# Add new movie
@router.post("/add-movie")
async def add_movie(
    title: Annotated[str, Form()],
    description: Annotated[str, Form()],
    poster_image: Annotated[UploadFile, File()],
    genre: Annotated[str, Form()],
    session: Annotated[Session, Depends(get_db_session)],
    role=Depends(require_role),
):

    if not title or not description or not genre:
        raise HTTPException(status_code=422, detail="All fields are required")

    if not poster_image:
        raise HTTPException(status_code=422, detail="Movie poster is required")

    poster_image_url = ""

    if poster_image:
        if poster_image.content_type not in ALLOWED_TYPES:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        new_filename = generate_unique_filename(poster_image)
        content = await poster_image.read()

        client = AsyncBlobClient()
        movie_poster_url = await client.put(
            f"mrs/movie-posters/{new_filename}", content, access="public"
        )

        poster_image_url = movie_poster_url.url

    movie = Movies(
        title=title, description=description, poster_image=poster_image_url, genre=genre
    )

    try:
        session.add(movie)
        session.commit()
        session.refresh(movie)

    except IntegrityError as e:
        session.rollback()
        print(str(e.orig))
        raise HTTPException(status_code=400, detail="Database constraint violated")

    return {"message": "Movie added"}


# Update movie details
@router.put("/update-movie/{movie_id}")
async def update_movie(
    movie_id: str,
    session: Annotated[Session, Depends(get_db_session)],
    role=Depends(require_role),
    title: Annotated[str | None, Form()] = None,
    description: Annotated[str | None, Form()] = None,
    poster_image: Annotated[UploadFile | None, File()] = None,
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
            raise HTTPException(status_code=400, detail="Unsupported file type")

        new_filename = generate_unique_filename(poster_image)
        content = await poster_image.read()

        client = AsyncBlobClient()

        uploaded_image = await client.put(
            f"mrs/movie-posters/{new_filename}", content, access="public"
        )

        movie.poster_image = uploaded_image.url

    session.commit()
    session.refresh(movie)

    return {"message": f"Movie with id: {movie_id} has been updated"}


# Delete existing movie
@router.delete("/delete-movie/{movie_id}")
async def delete_movie(
    session: Annotated[Session, Depends(get_db_session)],
    movie_id: str,
    role=Depends(require_role),
):
    movie = session.get(Movies, movie_id)

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    client = AsyncBlobClient()
    await client.delete(movie.poster_image)

    session.delete(movie)
    session.commit()

    return {"message": f"Movie with id: {movie_id} has been deleted."}