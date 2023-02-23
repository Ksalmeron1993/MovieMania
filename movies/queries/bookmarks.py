from pydantic import BaseModel
from typing import List, Union
from datetime import date 
from queries.pool import pool


class Error(BaseModel):
    message: str


#what data do we need for submitting a movie 
#data coming IN & and out of our endpoints in fastAPI - has nothing to do with our database
class BookmarkIn(BaseModel):
    user_id: int
    movie_id: int
    bookmark_date: date

class BookmarkOut(BaseModel):
    id: int
    user_id: int
    movie_id: int
    bookmark_date: date

class BookmarkRepository: 
    def update_bookmark(self, movie_id: int, bookmark: BookmarkIn) -> Union[BookmarkOut, Error]:
        try:
            #Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db: 
                    db.execute(
                        """
                        UPDATE bookmarks
                        SET user_id = %s
                        , movie_id = %s
                        , bookmark_date = %s
                        WHERE id = %s
                        """,
                        [
                            bookmark.user_id,
                            bookmark.movie_id,
                            bookmark.bookmark_date,
                        ]
                    )
                    return self.movie_in_to_out(movie_id, bookmark)
        except Exception as e:
            print(e)
            return {"message": "Could not update that movie"}

    def get_all_movies(self) -> Union[Error, List[BookmarkOut]]:
        try:
            # Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db: 
                    # Execute the SELECT statement 
                    db.execute(
                        """
                        SELECT user_id, movie_id, bookmark_date
                        FROM bookmarks 
                        ORDER BY user_id;
                        """
                    )
                    return [
                        BookmarkOut(
                            user_id=record[0],
                            movie_id=record[1],
                            bookmark_date=record[2],
                        )
                        for record in db 
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all bookmarked movies"}      
    
    def create(self, bookmark: BookmarkIn) -> Union[BookmarkOut, Error]:
        try:
            # Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO bookmarks
                            (user_id, movie_id, bookmark_date)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            bookmark.user_id,
                            bookmark.movie_id,
                            bookmark.bookmark_date
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    return self.bookmark_in_to_out(id, bookmark)
        except Exception:
            return {"message": "Create did not work properly"}

    def bookmark_in_to_out(self, id: int, bookmark: BookmarkIn) -> BookmarkOut:
        old_data = bookmark.dict()
        return BookmarkOut(id=id, **old_data)

