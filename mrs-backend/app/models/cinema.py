from app.database import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, UniqueConstraint

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
    seats = relationship("Seats", back_populates="hall")

    
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
    seat_label: Mapped[str] = mapped_column(String, nullable=False)

    __table_args__ = (
        UniqueConstraint("hall_id", "seat_label", name="unique_seat_per_hall"),
        )
    hall = relationship("Halls", back_populates="seats")
