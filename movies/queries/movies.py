from typing import List, Optional
from pydantic import BaseModel


class Movie(BaseModel):
    id: int
    title: str
    overview: str
    poster_path: Optional[str]
    release_date: Optional[str]
    vote_average: Optional[float]


class MovieSearchResult(BaseModel):
    page: int
    total_results: int
    total_pages: int
    results: List[Movie]
