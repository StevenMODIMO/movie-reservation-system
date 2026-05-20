from sqlmodel import SQLModel, Field
import uuid

class User(SQLModel, table=True):
    __tablename__ = "users"
    user_id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    email: str = Field(unique=True, nullable=False)
    password: str
    username: str

class Role(SQLModel, table=True):
    __tablename__ = "roles"
    role_id: uuid.UUID = Field(primary_key=True, default_factory=uuid.uuid4)
    role: str = Field(default="user")

class UserRole(SQLModel, table=True):
    __tablename__ = "user_roles"

    user_id: uuid.UUID = Field(
        foreign_key="users.user_id",
        primary_key=True
    )

    role_id: uuid.UUID = Field(
        foreign_key="roles.role_id",
        primary_key=True
    )