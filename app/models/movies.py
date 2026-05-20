from sqlmodel import SQLModel, Field
import uuid

class Movies(SQLModel, table=True):
    __tablename__ = "movies"
    movie_id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    title: str = Field(index=True)
    description: str = Field(nullable=False)
    poster_url: str = Field(nullable=False)

class Genre(SQLModel, table=True):
    __tablename__ = "genres"
    genre_id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    name: str = Field(unique=True)

class MovieGenre(SQLModel, table=True):
    __tablename__ = "movie_genres"
    movie_id: uuid.UUID = Field(foreign_key="movies.movie_id", primary_key=True)
    genre_id: uuid.UUID = Field(foreign_key="genres.genre_id", primary_key=True)

class ShowTime(SQLModel, table=True):
    __tablename__ = "showtimes"
    showtime_id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    movie_id: uuid.UUID = Field(foreign_key="movies.movie_id")
    start_time: str
    end_time: str

class Seat(SQLModel, table=True):
    __tablename__ = "seats"
    seat_id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    seat_number: str
    hall_name: str

class Reservations(SQLModel, table=True):
    _tablename__ = "reservations"
    reservation_id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    user_id: uuid.UUID = Field(foreign_key="users.user_id")
    showtime: uuid.UUID = Field(foreign_key="showtimes.showtime_id")
    seat_id: uuid.UUID = Field(foreign_key="seats.seat_id")
    status: str = Field(default="active")