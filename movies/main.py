from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import users, bookmarks, comments

app = FastAPI()

app.include_router(users.router)
app.include_router(bookmarks.router)
app.include_router(authenticator.router)
#app.include_router(comments.router)
