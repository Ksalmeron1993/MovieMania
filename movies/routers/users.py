from fastapi import (
    Depends,
    APIRouter,
    Request,
    Response,
    HTTPException,
    status,
)

from queries.users import (
    AccountQueries,
    DuplicateAccountError,
    Error,
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
)

from jwtdown_fastapi.authentication import Token
from typing import Union, Optional, List
from pydantic import BaseModel
from routers import auth


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=Union[UserToken, Error])
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    account_queries: AccountQueries = Depends(),
):
    hashed_password = auth.authenticator.hash_password(info.password)
    try:
        account = account_queries.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )

    form = UserForm(username=info.username, password=info.password)
    token = await auth.authenticator.login(
        response, request, form, account_queries
    )
    return UserToken(account=account, **token.dict())
