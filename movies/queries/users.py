from typing import Union, List
from queries.pool import pool
from pydantic import BaseModel

class DuplicateUserError(ValueError):
    pass

class Error(BaseModel):
    message: str

class UsersIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str

class UsersOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str
    hashed_password: str

class UsersOutWithPassword(UsersOut):
    hashed_password: str

class Userlogout(BaseModel):
    id: int
    username: str
    password: str
    token: str

class UsersRepo:
    def get_one_user(self, username: int) -> UsersOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , first_name
                            , last_name
                            , email
                            , username
                            , hashed_password
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    user = UsersOut(
                        id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        email=record[3],
                        username=record[4],
                        hashed_password=record[5]     
                    )
                    return user
        except Exception as e:
            print(e)
            return {"error message": "Could not get the user"}

    def get_all_users(self) -> Union[Error, List[UsersOut]]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db:
                    # Execute the SELECT statement
                    db.execute(
                        """
                        SELECT id, first_name, last_name, email, username, hashed_password
                        FROM users
                        """
                    )
                    result = db.fetchall()
                    return [UsersOut(
                            id=id ,
                            first_name=first_name, 
                            last_name=last_name,
                            email=email, 
                            username=username,
                            hashed_password=hashed_password)
                            for id, first_name, last_name, email, username, hashed_password in result]
        except Exception as e:
            print(e)
            return {"Users list could not be found, try again"}
     
    def create(self, user: UsersIn, hashed_password: str) -> UsersOutWithPassword:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name, last_name, email, username, hashed_password)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.username,
                            hashed_password,
                        ]
                    )
                    id = result.fetchone()[0]
                    old_data = user.dict()
                    # Return new data
                    return UsersOutWithPassword(id=id, **old_data, hashed_password=hashed_password)
        
    def delete(self, user_id: int) -> bool:
            try:
                with pool.connection() as conn:
                    with conn.cursor()as db:
                        result = db.execute(
                            """
                            DELETE FROM users
                            WHERE id = %s
                            RETURNING id
                            """
                            [user_id]
                        )
                        id = result.fetchone()[0]
                        return {f"User {id} deleted": True}
            except Exception as e:
                print(e)
                return {"User has been succesfully deleted": False}
    
    def update(self, user_id:int , user: UsersIn) -> UsersOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users 
                        SET first_name = %s
                            , last_name = %s
                            , email = %s
                            , username = %s
                            , hashed_password = %s
                        WHERE id = %s
                        """,
                        [
                            user.first_name,
                            user.last_name,
                            user.email,
                            user.username,
                            user.password,
                            user_id
                        ]
                    )
                    return self.Users_in_to_out(user_id, user)
        except Exception as e:
            print(e)
            return {"User did not update"}
        
    
    def Users_in_to_out(self, id: int, user: UsersOut):
        old_data = user.dict()
        return UsersOut(id=id, **old_data)

    