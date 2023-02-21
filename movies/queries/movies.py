from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date 
from queries.pool import pool


class Error(BaseModel):
    message: str


#what data do we need for submitting a movie 
#data coming IN & and out of our endpoints in fastAPI - has nothing to do with our database
class MovieIn(BaseModel):
    title: str
    release_year : date 
    genre: str 
    duration_minutes: int
    director: str
    imbd_rating: int  
    where_to_watch : Optional[str] 

class MovieOut(BaseModel):
    id: int
    title: str
    release_year : date 
    genre: str 
    duration_minutes: int
    director: str
    imbd_rating: int  
    where_to_watch : Optional[str] 

class MovieRepository: 
    def update_movie(self, movie_id: int, movie: MovieIn) -> Union[MovieOut, Error]:
        try:
            #Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db: 
                    db.execute(
                        """
                        UPDATE movies
                        SET title = %s
                        , release_year = %s
                        , genre = %s
                        , duration_minutes = %s
                        , director = %s 
                        , imbd_rating = %s
                        , where_to_watch = %s
                        WHERE id = %s
                        """,
                        [
                            movie.title,
                            movie.release_year,
                            movie.genre,
                            movie.duration_minutes,
                            movie.director,
                            movie.imbd_rating,
                            movie.where_to_watch,
                            movie_id
                        ]
                    )
                    return self.movie_in_to_out(movie_id, movie)
        except Exception as e:
            print(e)
            return {"message": "Could not update that movie"}

    def get_all_movies(self) -> Union[Error, List[MovieOut]]:
        try:
            # Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db: 
                    # Execute the SELECT statement 
                    db.execute(
                        """
                        SELECT id, title, release_year, genre, duration_minutes, director, imbd_rating, where_to_watch
                        FROM movies 
                        ORDER BY title;
                        """
                    )
                    return [
                        MovieOut(
                            id=record[0],
                            title=record[1],
                            release_year=record[2],
                            genre=record[3],
                            duration_minutes=record[4],
                            director=record[5],
                            imbd_rating=record[6],
                            where_to_watch=record[7]
                        )
                        for record in db 
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all movies"}      
    
    def create(self, movie: MovieIn) -> Union[MovieOut, Error]:
        try:
            # Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO movies
                            (title, release_year, genre, duration_minutes, director, imdb_rating, where_to_watch)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            movie.title, 
                            movie.release_year, 
                            movie.genre, 
                            movie.duration_minutes, 
                            movie.director, 
                            movie.imbd_rating, 
                            movie.where_to_watch
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    return self.movie_in_to_out(id, movie)
        except Exception:
            return {"message": "Create did not work properly"}

    def movie_in_to_out(self, id: int, movie: MovieIn) -> MovieOut:
        old_data = movie.dict()
        return MovieOut(id=id, **old_data)



