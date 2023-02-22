from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.movies import Error, MovieIn, MovieRepository, MovieOut

router = APIRouter()

# This is where our movies endpoints will go
# Our GETs and POSTs

@router.post("/movies/", response_model=Union[MovieOut, Error])
def create_movie(
    movie: MovieIn,
    response: Response, 
    repo: MovieRepository = Depends(),
) -> Union[MovieOut, Error]:
    response.status_code = 400
    return repo.create(movie)


@router.get("/movies/", response_model=Union[Error, List[MovieOut]])
def get_all_movies(
    repo: MovieRepository = Depends(),
) -> Union[Error, List[MovieOut]]:
    return repo.get_all_movies()


@router.put("/movies/{movie_id}", response_model=Union[Error, MovieOut])
def update_movie(
    movie_id: int,
    movie: MovieIn,
    repo: MovieRepository = Depends(),
) -> Union[Error, MovieOut]:
    return repo.update_movie(movie_id, movie)
