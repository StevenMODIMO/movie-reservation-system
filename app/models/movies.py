from database import Base
import uuid

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, DateTime, Numeric, UniqueConstraint
from datetime import datetime
from decimal import Decimal

# Movies Model
class Movies(Base):
    __tablename__ = "movies"
    movie_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    poster_image: Mapped[str] = mapped_column(String, nullable=False)
    genre: Mapped[str] = mapped_column(String, nullable=False)

    showtimes = relationship("Showtimes", back_populates="movie")


# Showtime Model
class Showtimes(Base):
    __tablename__ = "showtimes"
    showtime_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    movie_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("movies.movie_id"),
        index=True
    )
    hall_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("halls.hall_id"),
        index=True
    )
    start_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    end_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    ticket_price: Mapped[Decimal] = mapped_column(Numeric(10,2))

    __table_args__ = (
        UniqueConstraint("hall_id", "start_time", name="unique_showtime"),
        )

    movie = relationship("Movies", back_populates="showtimes")
    hall = relationship("Halls", back_populates="showtimes")
    

# Halls Model
class Halls(Base):
    __tablename__ = "halls"
    hall_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid = True),
        primary_key=True,
        default=uuid.uuid4
    )
    hall_name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    hall_abbrv: Mapped[str] = mapped_column(String, nullable=False, unique=True)

    showtimes = relationship("Showtimes", back_populates="hall")

    
# Seat Model
class Seats(Base):
    __tablename__ = "seats"
    seat_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    hall_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("halls.hall_id")
    )
    seat_label: Mapped[str] = mapped_column(String, unique=True, nullable=False)

    __table_args__ = (
        UniqueConstraint("hall_id", "seat_label", name="unique_seat_per_hall"),
        )

# Reservation Model
class Reservations(Base):
    __tablename__ = "reservations"
    reservation_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )
    showtime_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("showtimes.showtime_id")
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.user_id")
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    expires_in: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False
    )
    status: Mapped[str] = mapped_column(
        String, default="pending"
    )

# Reservation seats model
class ReservationSeats(Base):
    __tablename__ = "reservation_seats"
    reservation_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("reservations.reservation_id"),
        primary_key=True
    )
    seat_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("seats.seat_id"),
        primary_key=True
    )
    __table_args__ = (
        UniqueConstraint("reservation_id", "seat_id", name="unique_reservation_seat"),
        )
