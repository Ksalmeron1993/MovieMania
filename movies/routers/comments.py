from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.comments import Error, CommentIn, CommentRepository, CommentOut

router = APIRouter()

# This is where our comments endpoints will go
# Our GETs and POSTs


@router.post("/movies/comments", response_model=Union[CommentOut, Error])
def create_comment(
    comment: CommentIn,
    response: Response,
    repo: CommentRepository = Depends(),
) -> Union[CommentOut, Error]:
    response.status_code = 400
    return repo.create(comment)


@router.get("/movie/comments/", response_model=Union[Error, List[CommentOut]])
def get_all_comments(
    repo: CommentRepository = Depends(),
) -> Union[Error, List[CommentOut]]:
    return repo.get_all_comments()


@router.put(
    "/movies/comments/{movie_id}/", response_model=Union[Error, CommentOut]
)
def update_comment(
    movie_id: int,
    comment: CommentIn,
    repo: CommentRepository = Depends(),
) -> Union[Error, CommentOut]:
    return repo.update_comment(movie_id, comment)
