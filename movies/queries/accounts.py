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

class DuplicateAccountError(ValueError):
    pass

class AccountQueries:
    def create_account(
            self,
            account: AccountIn,
            hashed_password: str,
    ) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() a
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name, last_name, email, username, password)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account.first_name,
                            account.last_name,
                            account.email,
                            account.username,
                            hashed_password,
                        ],
                    )
                    id = result.fetchone()[0]
                    old_data = account.dict()

                    return AccountOutWithPassword(
                        id=id, hashed_password=hashed_password,
                        **old_data
                    )
        except Exception:
            return {"message": "Could not create account"}
