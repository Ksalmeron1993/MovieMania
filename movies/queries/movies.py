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
    director: str
    release_date : date 
    genre: str 
    runtime: int
    plot_summary : str

class MovieOut(BaseModel):
    id: int
    title: str
    director: str
    release_date : date 
    genre: str 
    runtime: int
    plot_summary : str

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
                        , director = %s
                        , release_date = %s
                        , genre = %s
                        , runtime = %s 
                        , plot_summary = %s
                        WHERE id = %s
                        """,
                        [
                            movie.title,
                            movie.director,
                            movie.release_date,
                            movie.genre,
                            movie.runtime, 
                            movie.plot_summary,
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
                        SELECT id, title, director, release_date , genre, runtime, plot_summary
                        FROM movies 
                        ORDER BY title;
                        """
                    )
                    return [
                        MovieOut(
                            id=record[0],
                            title=record[1],
                            director=record[2],
                            release_date=record[3],
                            genre=record[4],
                            runtime=record[5],
                            plot_summary=record[6]
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
                            (title, director, release_date, genre, runtime, plot_summary)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            movie.title, 
                            movie.director, 
                            movie.release_date, 
                            movie.genre, 
                            movie.runtime, 
                            movie.plot_summary
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



