# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UsersRepo, UsersOut, UsersOutWithPassword

class MyAuthenticator(Authenticator):
    async def get_account_data(
            self,
            username: str,
            users: UsersRepo,
    ):
         return users.get_user(username)

    def get_account_getter(
        self,
        users: UsersRepo = Depends(),
    ):
        return users

    def get_hashed_password(self, user: UsersOutWithPassword):
        return user.hashed_password

    def get_users_data_for_cookie(self, users: UsersOut):
        return users.username, UsersOut(**users.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
