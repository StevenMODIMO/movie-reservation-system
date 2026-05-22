from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    DATABASE_URL: str
    BLOB_READ_WRITE_TOKEN: str
    SECRET_KEY: str
    ALGORITHM:str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    model_config = SettingsConfigDict(env_file = ".env")

settings = Settings()

os.environ["BLOB_READ_WRITE_TOKEN"] = settings.BLOB_READ_WRITE_TOKEN