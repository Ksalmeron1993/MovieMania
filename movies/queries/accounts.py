from typing import Optional, Union, List
from queries.pool import pool
from pydantic import BaseModel


class AccountIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountRepo:
    def create(self, users: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO Accounts
                        (
                            first_name, last_name, email, username, password
                        )
                    VALUES
                        (%s,%s,%s,%s,%s)
                    RETURNING account_id;
                    """,
                    [
                        users.first_name, users.last_name, users.email, users.username, hashed_password
                     ]
                )

                user_id = result.fetchone()[0]
                old_data = users.dict()
                return AccountOutWithPassword(user_id=user_id, hashed_password=hashed_password, **old_data)
    
