from fastapi import FastAPI
from app.routes import (
    movies as movies_router,
    users as users_router,
    reservations as reservations_router,
    showtimes as showtimes_router,
    cinema as cinema_router
)
from app.database import engine, Base
from app.models import users, movies
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy

app = FastAPI()

origins = ["http://localhost:3000", "https://movie-reservation-system-one.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users_router.router)
app.include_router(movies_router.router)
app.include_router(reservations_router.router)
app.include_router(showtimes_router.router)
app.include_router(cinema_router.router)


@app.get("/", tags=["Home"])
def root():
    return {"OK": "OK", "SQLALchemy-Version": sqlalchemy.__version__}
