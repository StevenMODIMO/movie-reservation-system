from fastapi import FastAPI
from routes import users
from database import engine, Base

app = FastAPI()

def create_db_and_tables():
    Base.metadata.create_all(engine)

@app.on_event("startup")
def on_startup():
	create_db_and_tables()

app.include_router(users.router)

@app.get("/", tags=["Home"])
def root():
	return { "OK": "OK"}