import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountRepo, AccountOut, AccountOutWithPassword

class TestAuthenticator(Authenticator):
    async def







authenticator = TestAuthenticator(os.environ["SIGNING_KEY"])
