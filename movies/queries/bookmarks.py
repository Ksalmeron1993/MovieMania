from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class Bookmark(BaseModel):
    id:int
    user_id: int
    movie_id: int

#what data do we need for submitting a movie
#data coming IN & and out of our endpoints in fastAPI - has nothing to do with our database
class BookmarkIn(BaseModel):
    user_id: int
    movie_id: int

class BookmarkOut(BaseModel):
    id: int
    user_id: int
    movie_id: int

class BookmarkRepository:
    def get_bookmark_by_id(self, id: int) -> BookmarkOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , movie_id
                        FROM bookmarks
                        WHERE id = %s;
                        """,
                        [id],
                    )
                record = result.fetchone()
                if record is None:
                    return None
                return Bookmark (
                        id=record[0],
                        user_id=record[1],
                        movie_id=record[2],
                    )
    def get_all_bookmarks(self) -> Union[Error, List[BookmarkOut]]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db:
                    # Execute the SELECT statement
                    db.execute(
                        """
                        SELECT id, user_id, movie_id
                        FROM bookmarks
                        """
                    )
                    result = db.fetchall()
                    return [BookmarkOut(
                            id=id,
                            user_id=user_id,
                            movie_id=movie_id)
                            for id,user_id,movie_id in result]
        except Exception as e:
            print(e)
            return {"message": "Could not get all bookmarked movies"}

    # def create_a_bookmark(self, bookmark: BookmarkIn) -> Union[BookmarkOut, Error]:
    #     with pool.connection() as conn:
    #         with conn.cursor() as db:

    #                 # Check if the user exists
    #                 db.execute(
    #                     """
    #                     SELECT id FROM users
    #                     WHERE id = %s;
    #                     """,
    #                     [bookmark.user_id]
    #                 )
    #                 if db.rowcount == 0:
    #                     return Error(status_code=404, detail="User not found")

    #                 # Check if the movie exists
    #                 db.execute(
    #                     """
    #                 SELECT id FROM movies
    #                 WHERE id = %s;
    #                     """,
    #                     [bookmark.movie_id]
    #                 )
    #                 if db.rowcount == 0:
    #                     return Error(status_code=404, detail="Movie not found")

    #                 # Create the bookmark
    #                 db.execute(
    #                     """
    #                     INSERT INTO bookmarks
    #                         (user_id, movie_id)
    #                     VALUES
    #                         (%s, %s);
    #                     RETURNING id, user_id, movie_id;
    #                     """,
    #                     [
    #                         bookmark.user_id,
    #                         bookmark.movie_id
    #                     ]
    #                 )

    #                 # Return the bookmark information
    #                 result = db.fetchone()
    #                 return BookmarkOut(id=result[0], user_id=result[1], movie_id=result[2])


    def create_a_bookmark(self, bookmark: BookmarkIn) -> Union[BookmarkOut, Error]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO bookmarks
                        (user_id, movie_id)
                    VALUES
                        (%s, %s)
                    RETURNING id;
                    """,
                    [
                        bookmark.user_id,
                        bookmark.movie_id
                    ]
                )
                id = result.fetchone()[0]
                old_data = bookmark.dict()
                return self.bookmark_in_to_out(id, bookmark)

    def delete_a_bookmark(self, movie_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM bookmarks
                    WHERE id = %s
                    """,
                    [movie_id],
                )

    def bookmark_in_to_out(self, id: int, bookmark: BookmarkIn) -> BookmarkOut:
        old_data = bookmark.dict()
        return BookmarkOut(id=id, **old_data)
