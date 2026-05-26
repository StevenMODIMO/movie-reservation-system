from typing import List
from sqlalchemy.orm import Mapped, mapped_column,relationship
from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base

class User(Base):
    __tablename__ = "users"
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
        )
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String)
    username: Mapped[str] = mapped_column(String)
    avatar_url: Mapped[str] = mapped_column(String)
    role: Mapped[str] = mapped_column(String, default="user")

# class Role(Base):
#     __tablename__ = "roles"
#     role_id: Mapped[uuid.UUID] = mapped_column(
#         UUID(as_uuid=True),
#         primary_key=True,
#         default=uuid.uuid4
#         )
#     role: Mapped[str] = mapped_column(String,default="user")

#     user_roles: Mapped[List["UserRole"]] = relationship(
#         back_populates="role",
#         cascade="all, delete-orphan"
#     )

# class UserRole(Base):
#     __tablename__ = "user_roles"

#     user_id: Mapped[uuid.UUID] = mapped_column(
#         UUID(as_uuid=True),
#         ForeignKey("users.user_id", ondelete="CASCADE"),
#         primary_key=True
#     )

#     role_id: Mapped[uuid.UUID] = mapped_column(
#         UUID(as_uuid=True),
#         ForeignKey("roles.role_id", ondelete="CASCADE"),
#         primary_key=True
#     )

#     user: Mapped["User"] = relationship(
#         back_populates="user_roles"
#     )

#     role: Mapped["Role"] = relationship(
#         back_populates="user_roles"
#     )