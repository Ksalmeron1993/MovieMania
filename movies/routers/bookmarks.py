from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response
)
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from queries.bookmarks import BookmarkIn, BookmarkRepository, BookmarkOut
from authenticator import authenticator

router = APIRouter()
auth = HTTPBearer()

class BookmarkForm(BaseModel):
    user_id: int
    movie_id :int
    
@router.post("/movies/bookmarks/{user_id}", response_model=BookmarkOut)
def create_a_bookmark(
    user_id: int,
    bookmark_form: BookmarkForm,
    repo: BookmarkRepository = Depends(),
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    bookmark_data = bookmark_form.dict()
    bookmark_data["user_id"] = user_id
    return repo.create_a_bookmark(BookmarkIn(**bookmark_data), user_id)

@router.get("/movies/bookmarks/all",tags=["bookmarks"])
def get_all_bookmarks(
    repo:BookmarkRepository = Depends(), ):
    return repo.get_all_bookmarks()

@router.get("/bookmarks/get/{id}", tags=["bookmarks"])
def get_a_bookmark(
    id: int,
    repo: BookmarkRepository = Depends()) -> BookmarkOut:
    return repo.get_bookmark_by_id(id)

# @router.get("/bookmarks/get/{bookmark_id}", tags=["bookmarks"])
# def get_a_bookmark(
#     bookmark_id: int,
#     repo: BookmarkRepository = Depends(),
# ) -> BookmarkOut:
#     return repo.get_bookmark_by_id(bookmark_id)
@router.get("/bookmarks/get/all/{user_id}/",  tags=["bookmarks"])
def get_all_user_bookmarks(
    user_id: int,
    repo: BookmarkRepository = Depends()) -> BookmarkOut:
    return repo.get_all_user_bookmarks(user_id)

@router.delete("/bookmarks/delete/{movie_id}", tags=["bookmarks"])
def delete_a_bookmark(
    movie_id: int,
    repo: BookmarkRepository = Depends(),):
    repo.delete_a_bookmark(movie_id)
    return True
