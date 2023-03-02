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




