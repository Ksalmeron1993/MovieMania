from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.bookmarks import Error, BookmarkIn, BookmarkRepository, BookmarkOut

router = APIRouter()

# This is where our bookmarks endpoints will go
# Our GETs and POSTs

@router.post("/movies/bookmarks", response_model=Union[BookmarkOut, Error])
def create_bookmark(
    bookmark: BookmarkIn,
    response: Response, 
    repo: BookmarkRepository = Depends(),
) -> Union[BookmarkOut, Error]:
    response.status_code = 400
    return repo.create(bookmark)


@router.get("/movies/bookmarks/", response_model=Union[Error, List[BookmarkOut]])
def get_all_bookmarks(
    repo: BookmarkRepository = Depends(),
) -> Union[Error, List[BookmarkOut]]:
    return repo.get_all_bookmarks()


@router.put("/movies/bookmarks/{movie_id}/", response_model=Union[Error, BookmarkOut])
def update_bookmark(
    movie_id: int,
    bookmark: BookmarkIn,
    repo: BookmarkRepository = Depends(),
) -> Union[Error, BookmarkOut]:
    return repo.update_bookmark(movie_id, bookmark)
