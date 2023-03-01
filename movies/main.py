from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import movies, users, bookmarks, comments

app = FastAPI()

app.include_router(users.router)
app.include_router(bookmarks.router)
app.include_router(authenticator.router)
app.include_router(movies.router)
#app.include_router(comments.router)

# origins = [
#     os.environ.get("CORS_HOST", "http://localhost:3000"),
# ]

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

