from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date 
from queries.pool import pool


class Error(BaseModel):
    message: str


#what data do we need for submitting a movie 
#data coming IN & and out of our endpoints in fastAPI - has nothing to do with our database
class CommentIn(BaseModel):
    user_id: int
    movie_id : int 
    comment_text: str 
    comment_date: date

class CommentOut(BaseModel):
    id: int
    user_id: int
    movie_id : int 
    comment_text: str 
    comment_date: date

class CommentRepository: 
    def update_comment(self, user_id: int, comment: CommentIn) -> Union[CommentOut, Error]:
        try:
            #Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db: 
                    db.execute(
                        """
                        UPDATE comments
                        SET user_id = %s
                        , movie_id = %s
                        , comment_text = %s
                        , comment_date = %s
                        WHERE id = %s
                        """,
                        [
                            comment.user_id,
                            comment.movie_id,
                            comment.comment_text,
                            comment.comment_date,
                            
                        ]
                    )
                    return self.movie_in_to_out(user_id, comment)
        except Exception as e:
            print(e)
            return {"message": "Could not update that comment"}

    def get_all_comments(self) -> Union[Error, List[CommentOut]]:
        try:
            # Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db: 
                    # Execute the SELECT statement 
                    db.execute(
                        """
                        SELECT user_id, movie_id, comment_text, comment_date
                        FROM comments 
                        ORDER BY user_id;
                        """
                    )
                    return [
                        CommentOut(
                            user_id=record[0],
                            movie_id=record[1],
                            comment_text=record[2],
                            comment_date=record[3]
                        )
                        for record in db 
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all comments"}      
    
    def create(self, comment: CommentIn) -> Union[CommentOut, Error]:
        try:
            # Connect to the database 
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO comments
                            (user_id, movie_id, comment_text, comment_date)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            comment.user_id, 
                            comment.movie_id, 
                            comment.comment_text, 
                            comment.comment_date
                          
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    return self.comment_in_to_out(id, comment)
        except Exception:
            return {"message": "Create did not work properly"}

    def comment_in_to_out(self, id: int, comment: CommentIn) -> CommentOut:
        old_data = comment.dict()
        return CommentOut(id=id, **old_data)
