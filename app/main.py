from fastapi import FastAPI
from database import engine
from sqlmodel import SQLModel

app = FastAPI()

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@app.on_event("startup")
def on_startup():
	create_db_and_tables()


@app.get("/", tags=["Home"])
def root():
	return { "OK": "OK"}	