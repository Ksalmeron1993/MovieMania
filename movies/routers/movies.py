# from fastapi import APIRouter, Depends, Response
# from typing import Union, List
# from queries.movies import Error, MovieIn, MovieRepository, MovieOut

# router = APIRouter()

# # This is where our movies endpoints will go
# # Our GETs and POSTs

# @router.post("/movies/", response_model=Union[MovieOut, Error])
# def create_movie(
#     movie: MovieIn,
#     response: Response,
#     repo: MovieRepository = Depends(),
# ) -> Union[MovieOut, Error]:
#     response.status_code = 400
#     return repo.create(movie)


# @router.get("/movies/", response_model=Union[Error, List[MovieOut]])
# def get_all_movies(
#     repo: MovieRepository = Depends(),
# ) -> Union[Error, List[MovieOut]]:
#     return repo.get_all_movies()
# const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=7d055fdafcdf398aab55d81760d1c151&query=`;
# # @app.get("/movies")
# # async def get_movies():
# #     # Here you can make API requests using the API key and return the results
# #     # For example:
# #     # response = requests.get("https://api.example.com/movies", headers={"API-Key": "7d055fdafcdf398aab55d81760d1c151"})
# #     # return response.json()
# #     return {"message": "Hello, world!"}



# @router.put("/movies/{movie_id}", response_model=Union[Error, MovieOut])
# def update_movie(
#     movie_id: int,
#     movie: MovieIn,
#     repo: MovieRepository = Depends(),
# ) -> Union[Error, MovieOut]:
#     return repo.update_movie(movie_id, movie)

from fastapi import APIRouter, HTTPException
from typing import List
import requests
from queries.movies import Movie, MovieSearchResult



router = APIRouter()

API_URL = "https://api.themoviedb.org/3/search/movie?api_key=7d055fdafcdf398aab55d81760d1c151&query="



# @router.get("/movies/{movie_name}")
# async def get_movies(movie_name: str) -> List[dict]:
#     try:
#         url = API_URL + movie_name
#         response = requests.get(url)
#         response.raise_for_status() # Raise an exception if the response status code is not 2xx
#         results = response.json()["results"]
#         return results

#     except requests.exceptions.HTTPError as e:
#         raise HTTPException(status_code=response.status_code, detail=str(e))
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

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
