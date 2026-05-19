from sqlmodel import SQLModel, Field

class User(SQLModel, table=True):
    username: str = Field(index=True, primary_key=True)
    secret_name: str | None