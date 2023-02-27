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
