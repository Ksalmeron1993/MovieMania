from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import movies, users, bookmarks, comments


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
origins = [
    "http://localhost:3000/",
    "http://localhost/",
    "http://localhost:8000/",
    "http://localhost:8080/",
]
# enable CORS for all routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(movies.router)
app.include_router(users.router)
app.include_router(bookmarks.router)
app.include_router(authenticator.router)
#app.include_router(comments.router)