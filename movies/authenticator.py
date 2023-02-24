# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.user import UserRepository, UserOut, UserOutWithPassword


class UserAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        user: UserRepository,
    ):
        return user.get(username)

    def get_account_getter(
        self,
        user: UserRepository = Depends(),
    ):
        return user

    def get_hashed_password(self, user: UserOutWithPassword):
        return user.hashed_password

    def get_account_data_for_cookie(self, user: UserOut):
        return user.username, UserOut(**user.dict())


authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
