# from fastapi import (
#     Depends,
#     APIRouter,
#     Request,
#     Response,
#     HTTPException,
#     status,
# )

# from queries.accounts import (
#     AccountQueries,
#     DuplicateAccountError,
#     Error,
#     AccountIn,
#     AccountOut,
#     AccountOutWithPassword,
# )

# from jwtdown_fastapi.authentication import Token
# from typing import Union, Optional, List
# from pydantic import BaseModel
# from routers import auth


# class UserForm(BaseModel):
#     username: str
#     password: str


# class UserToken(Token):
#     account: AccountOut


# class HttpError(BaseModel):
#     detail: str


# router = APIRouter()


# @router.post("/api/accounts", response_model=Union[UserToken, Error])
# async def create_account(
#     info: AccountIn,
#     request: Request,
#     response: Response,
#     account_queries: AccountQueries = Depends(),
# ):
#     hashed_password = auth.authenticator.hash_password(info.password)
#     try:
#         account = account_queries.create(info, hashed_password)
#     except DuplicateAccountError:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Cannot create an account with those credentials",
#         )

#     form = UserForm(username=info.username, password=info.password)
#     token = await auth.authenticator.login(
#         response, request, form, account_queries
#     )
#     return UserToken(account=account, **token.dict())

from queries.user import UserIn, UserRepository, UserOut, DuplicateAccountError
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel

class AccountForm(BaseModel):
    username: str
    password: str

class AccountToken(Token):
    account: UserOut

class HttpError(BaseModel):
    detail: str

router = APIRouter()

@router.get("/protected", response_model=bool,tags=["Users"])
async def protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
    ):
    return True


@router.post("/signup", tags=["Users"])
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create(info, hashed_password)

    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    print(account)
    return AccountToken(account=account, **token.dict())


@router.put("/update/{user_id}",tags=["Users"])
def update_user(
    user_id: int,
    user: UserIn,
    repo: UserRepository = Depends(),) -> UserOut:
    return repo.update(user_id,user)

@router.delete("/delete/{user_id}",tags=["Users"])
def delete_user(
    user_id: int,
    repo: UserRepository = Depends(),):
    return repo.delete(user_id)

@router.get("/get/{username}",tags=["Users"])
def get_user(
    username: str,
    repo: UserRepository = Depends(),) -> UserOut:
    return repo.get(username)

@router.get("/users/all",tags=["Users"])
def get_all_users(
    repo: UserRepository = Depends(),):
    return repo.get_all()


@router.get("/token", response_model=AccountToken | None,tags=["Users"])
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
