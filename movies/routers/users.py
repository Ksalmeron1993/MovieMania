from fastapi import (
    Depends,
    APIRouter,
    Request,
    Response,
    HTTPException,
    status,
)
from authenticator import TestAuthenticator

from queries.users import (
    UsersRepo,
    DuplicateUserError,
    UsersIn,
    UsersOut,
    #UsersOutWithPassword,
    Error

)

from jwtdown_fastapi.authentication import Token
from typing import Union, Optional, List
from pydantic import BaseModel
from routers import auth


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UsersOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


# @router.post("/api/users", response_model=Union[UserToken, Error])
# async def create_account(
#     info: UserIn,
#     request: Request,
#     response: Response,
#     account_queries: AccountQueries = Depends(),
# ):
#     hashed_password = auth.TestAuthenticator.hash_password(info.password)
#     try:
#         account = account_queries.create(info, hashed_password)
#     except DuplicateAccountError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot create an account with those credentials",
#         )

#     form = UserForm(username=info.username, password=info.password)
#     token = await auth.TestAuthenticator.login(
#         response, request, form, account_queries
#     )
#     return UserToken(account=account, **token.dict())

@router.post("/signup", tags=["Users"])
async def create_account(
    info: UsersIn,
    request: Request,
    response: Response,
    repo: UsersRepo = Depends(),
):
    hashed_password = TestAuthenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)

    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.email, password=info.password)
    token = await TestAuthenticator.login(response, request, form, repo)
    print(account)
    return UserToken(account=account, **token.dict())
