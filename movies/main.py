from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import movies
from authenticator import Authenticator
from routers import movies, accounts

app = FastAPI()

app.include_router(movies.router)
app.include_router(Authenticator.router)
app.include_router(accounts.router)
