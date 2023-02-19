from fastapi import APIRouter, Depends
from queries.movies import MovieIn, MovieRepository

router = APIRouter()

#this is where our movies endpoints will go 
#our gets and posts 

@router.post("/movies")
#type hints - used for what data we need 
def create_movie(
    movie:MovieIn,
    repo: MovieRepository = Depends()
    ):
    print('movie', movie) 
    return movie

@router.get("/movies")
def get_movies(movie:MovieIn):
    pass