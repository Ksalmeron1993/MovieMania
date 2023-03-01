from fastapi import APIRouter, HTTPException
from typing import List
import requests
from queries.movies import Movie, MovieSearchResult



router = APIRouter()

API_URL = "https://api.themoviedb.org/3/search/movie?api_key=7d055fdafcdf398aab55d81760d1c151&query="



@router.get("/movies/{movie_name}")
async def get_movies(movie_name: str) -> List[dict]:
    try:
        url = API_URL + movie_name
        response = requests.get(url)

        if response.status_code < 200 or response.status_code >= 300:
            raise HTTPException(status_code=response.status_code, detail=response.json())

        results = response.json()["results"]
        return results

    except requests.exceptions.HTTPError as e:
        raise HTTPException(status_code=response.status_code, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
