from fastapi import (
    Depends,
    APIRouter,
    Request,
    Response,
    HTTPException,
    status,
)

from queries.users import (
    UsersRepo,
    DuplicateUserError,
    UsersIn,
    UsersOut
)

from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel

class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UsersOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()

@router.get("/protected", response_model=bool,tags=["Users"])
async def protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
    ):
    return True

@router.post("/signup")
async def create_user(
    info: UsersIn,
    request: Request,
    response: Response,
    repo: UsersRepo = Depends(),
):
    print(info)
    print("info", info)


    hashed_password = authenticator.hash_password(info.password)
    print("hashed_password", hashed_password)

    # return "Hello World"
    try:
        user = repo.create(info, hashed_password)

    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    print()
    return UserToken(user=user, **token.dict())

@router.put("/users/{user_id}", response_model=bool)
def update_a_user(
    user_id: int,
    user: UsersIn,
    repo: UsersRepo = Depends(),) -> UsersOut:
    return repo.update(user_id, user)

@router.delete("/users/delete/{user_id}", tags=["Users"])
def delete_a_user(
    user_id: int, 
    repo: UsersRepo = Depends(),):
    return repo.delete(user_id)

@router.get("/users/get/{user_id}", tags=["Users"])
def get_user(
    user_id: str,
    repo: UsersRepo = Depends(),) -> UsersOut:
    return repo.get(user_id)

@router.get("/get/all",tags=["Users"])
def get_all_users(
    repo:UsersRepo = Depends (), ):
    return repo.get_all()


@router.get("/token", response_model=UserToken | None, tags=["Users"])
async def get_access_token(
    request: Request,
    user : UsersOut = Depends(authenticator.try_get_current_account_data)
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token" : request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user , 
        }




























