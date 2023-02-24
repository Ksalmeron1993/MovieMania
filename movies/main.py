from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import movies
from authenticator import TestAuthenticator
from routers import movies, users, bookmarks, comments

app = FastAPI()

app.include_router(movies.router)
app.include_router(users.router)
app.include_router(bookmarks.router)
app.include_router(TestAuthenticator.router)
