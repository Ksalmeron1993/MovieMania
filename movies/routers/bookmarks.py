from fastapi import (
APIRouter, Depends, APIRouter,)
from queries.bookmarks import (BookmarkIn, BookmarkRepository, BookmarkOut)
from authenticator import authenticator
from pydantic import BaseModel

router = APIRouter()

# This is where our bookmarks endpoints will go
# Our GETs and POSTs

class BookmarkForm(BaseModel):
    user_id: int
    movie_id :int

@router.post("/movies/bookmarks/", response_model=BookmarkOut)
def create_a_bookmark(
    bookmark_in: BookmarkIn,
    repo: BookmarkRepository = Depends(),
    account_data: dict = Depends(authenticator.get_account_data),
):
    return repo.create_a_bookmark(bookmark_in)



@router.get("/movies/bookmarks/all",tags=["bookmarks"])
def get_all_bookmarks(
    repo:BookmarkRepository = Depends(), ):
    return repo.get_all_bookmarks()

@router.get("/bookmarks/get/{movie_id}", tags=["bookmarks"])
def get_one_user(
    movie_id: int,
    repo: BookmarkRepository = Depends(),) -> BookmarkOut:
    return repo.get_bookmark_by_id(movie_id)


@router.delete("/bookmarks/delete/{movie_id}", tags=["bookmarks"])
def delete_a_bookmark(
    movie_id: int,
    repo: BookmarkRepository = Depends(),):
    repo.delete_a_bookmark(movie_id)
    return True
