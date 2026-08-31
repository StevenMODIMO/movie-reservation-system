from app.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, DateTime
from datetime import datetime, timezone


# Reservation Model
class Reservations(Base):
    __tablename__ = "reservations"
    reservation_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    showtime_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("showtimes.showtime_id"))
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.user_id"))
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
    expires_in: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )
    status: Mapped[str] = mapped_column(String, default="pending")
    showtime = relationship("Showtimes")
    user = relationship("User", back_populates="reservations")


# Reservation seats model
class ReservationSeats(Base):
    __tablename__ = "reservation_seats"
    reservation_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("reservations.reservation_id"), primary_key=True
    )
    seat_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("seats.seat_id"), primary_key=True
    )
