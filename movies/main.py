from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
<<<<<<< Updated upstream
from routers import movies, accounts
=======
from routers import movies, comments, bookmarks, users
>>>>>>> Stashed changes

app = FastAPI()

app.include_router(movies.router)
<<<<<<< Updated upstream
app.include_router(accounts.router)
=======
app.include_router(comments.router)
app.include_router(bookmarks.router)
app.include_router(users.router)
>>>>>>> Stashed changes
