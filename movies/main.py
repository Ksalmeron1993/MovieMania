from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import movies, comments, bookmarks

app = FastAPI()

app.include_router(movies.router)
app.include_router(comments.router)
app.include_router(bookmarks.router)
