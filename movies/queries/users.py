from typing import Optional, Union, List
from queries.pool import pool
from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token

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
    user_id: int
    first_name: str
    last_name: str
    email: str
    username: str

class UserToken(Token):
    user: UsersOut

class UsersOutWithPassword(UsersOut):
    hashed_password: str

class Userlogout(BaseModel):
    id: int
    username: str
    password: str
    token: str

class UsersRepo:
    def create(self, users: UsersIn, hashed_password: str) -> UsersOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (
                            first_name, last_name, email, username, hashed_password
                        )
                    VALUES
                        (%s,%s,%s,%s,%s)
                    RETURNING id;
                    """,
                    [
                        users.first_name, users.last_name, users.email, users.username, hashed_password
                     ]
                )

                user_id = result.fetchone()[0]
                old_data = users.dict()
                return UsersOutWithPassword(user_id=user_id, hashed_password=hashed_password, **old_data)

    def get_one_user(self, username: str) -> Optional[UsersOutWithPassword]:
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
                            , password
                        FROM users
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    print("record", record)
                    if record is None:
                        return None
                    return self.Users_in_to_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def get_all_users(self) -> Union[Error, List[UsersOut]]:
        try:
            # Connect to the database
            with pool.connection() as conn:
                # Get a cursor to run SQL with
                with conn.cursor() as db:
                    # Execute the SELECT statement
                    db.execute(
                        """
                        SELECT id, first_name, last_name, email, username, password
                        FROM users
                        ORDER BY title;
                        """
                    )
                    return [
                        UsersOut(
                            id=record[0],
                            frist_name=record[1],
                            last_name=record[2],
                            email=record[3],
                            username=record[4],
                            password=record[5],
                        )
                        for record in db
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all Users"}

    def create(self, Users: UsersIn, hashed_password: str) -> Union[UsersOut, Error]:
        try:
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
                            Users.first_name,
                            Users.last_name,
                            Users.email,
                            Users.username,
                            hashed_password,
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    return self.Users_in_to_out(id, Users)
        except Exception:
            return {"message": "Create did not work properly"}

    def Users_in_to_out(self, id: int, Users: UsersIn) -> UsersOut:
        old_data = Users.dict()
        return UsersOut(id=id, **old_data)

    def Users_in_to_out(
        self, id: int, user: UsersIn, hashed_password: str
    ):
        old_data = user.dict()
        return UsersOutWithPassword(
            id=id, hashed_password=hashed_password, **old_data
        )

    def record_to_user_out(self, record):
        return UsersOutWithPassword(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            email=record[3],
            username=record[4],
            hashed_password=record[5],
        )
