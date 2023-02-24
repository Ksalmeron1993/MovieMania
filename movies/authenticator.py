import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UsersRepo, UsersOut, UsersOutWithPassword

class TestAuthenticator(Authenticator):
    async def get_users_data(
            self,
            username: str,
            users: UsersRepo,
    ):
         return users.get_one(username)

    def get_users_getter(
        self,
        users: UsersRepo = Depends(),
    ):

        return users


    def get_hashed_password(self, Users: UsersOutWithPassword):

        return Users.hashed_password

    def get_users_data_for_cookie(self, users: UsersOut):

        return users.username, UsersOut(**users.dict())


authenticator = TestAuthenticator(os.environ["SIGNING_KEY"])











authenticator = TestAuthenticator(os.environ["SIGNING_KEY"])
