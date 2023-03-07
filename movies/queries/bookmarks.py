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
    
    def get_all_user_bookmarks(self, user_id: int) -> Union[Error, List[BookmarkOut]]:
        try:
                # Connect to the database
                with pool.connection() as conn:
                    # Get a cursor to run SQL with
                    with conn.cursor() as db:
                        # Execute the SELECT statement
                        db.execute(
                             """
                            SELECT id
                                , user_id
                                , movie_id
                            FROM bookmarks
                            WHERE user_id = %s;
                        """,
                        [user_id],
                        )
                        result = db.fetchall()
                        return [BookmarkOut(
                                id=id,
                                user_id=user_id,
                                movie_id=movie_id)
                                for id, user_id, movie_id in result]
        except Exception as e:
                print(e)
                return {"message": "Could not get all users bookmarked movies"}
   
    def create_a_bookmark(self, bookmark: BookmarkIn, user_id: int) -> Union[BookmarkOut, Error]:
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
                        user_id,
                        bookmark.movie_id,
                    ],
                )
                id = result.fetchone()[0]
                return BookmarkOut(
                    id=id,
                    user_id=user_id,
                    movie_id=bookmark.movie_id,
                )
  
    def delete_a_bookmark(self, bookmark_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as db:
                db.execute(
                    """
                    DELETE FROM bookmarks
                    WHERE id = %s
                    """,
                    [bookmark_id],
                )
    def bookmark_in_to_out(self, id: int, bookmark: BookmarkIn) -> BookmarkOut:
        return BookmarkOut(id=id, **bookmark.dict())
