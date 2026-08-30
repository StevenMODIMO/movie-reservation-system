from fastapi import FastAPI
from app.routes import movies as movies_router, users as users_router
from app.database import engine, Base
from app.models import users, movies
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
	"http://localhost:3000",
	"https://movie-reservation-system-one.vercel.app"
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"]
)

def create_db_and_tables():
    Base.metadata.create_all(engine)

@app.on_event("startup")
def on_startup():
	create_db_and_tables()

app.include_router(users_router.router)
app.include_router(movies_router.router)

@app.get("/", tags=["Home"])
def root():
	return { "OK": "OK"}
