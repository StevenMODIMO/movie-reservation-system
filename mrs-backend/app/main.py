from fastapi import FastAPI
from routes import users as users_router
from routes import movies as movie_routers
from database import engine, Base
from models import users, movies
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
	"http://localhost:3000"
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
app.include_router(movie_routers.router)

@app.get("/", tags=["Home"])
def root():
	return { "OK": "OK"}
