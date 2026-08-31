from app.database import Base
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
    showtimes = relationship("Showtimes", back_populates="movie", cascade="all, delete-orphan")


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
        ForeignKey("movies.movie_id", ondelete="CASCADE"),
        index=True
    )
    hall_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("halls.hall_id", ondelete="CASCADE"),
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
    