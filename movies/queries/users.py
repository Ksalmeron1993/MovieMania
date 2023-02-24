# from typing import Optional, Union, List
# from queries.pool import pool
# from pydantic import BaseModel

# class Error(BaseModel):
#     message: str


# class AccountIn(BaseModel):
#     first_name: str
#     last_name: str
#     email: str
#     username: str
#     password: str


# class AccountOut(BaseModel):
#     id: int
#     first_name: str
#     last_name: str
#     email: str
#     username: str

# class AccountOutWithPassword(AccountOut):
#     hashed_password: str

# class DuplicateAccountError(ValueError):
#     pass

# class AccountQueries:
#     def create_account(
#             self,
#             account: AccountIn,
#             hashed_password: str,
#     ) -> AccountOutWithPassword:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         INSERT INTO users
#                             (first_name, last_name, email, username, password)
#                         VALUES
#                             (%s, %s, %s, %s, %s)
#                         RETURNING id;
#                         """,
#                         [
#                             account.first_name,
#                             account.last_name,
#                             account.email,
#                             account.username,
#                             hashed_password,
#                         ],
#                     )
#                     id = result.fetchone()[0]
#                     # old_data = account.dict()
#                     return self.account_in_to_out(id, account, hashed_password)

#                     # return AccountOutWithPassword(
#                     #     id=id, hashed_password=hashed_password,
#                     #     **old_data
#                     # )
#         except Exception:
#             return {"message": "Could not create account"}


from pydantic import BaseModel
from queries.pool import pool
from typing import List


class AccountForm(BaseModel):
    username: str
    password: str

class DuplicateAccountError(ValueError):
    pass


class UserIn(BaseModel):
    username: str
    password: str
    email: str


class UserOut(BaseModel):
    id: str
    username: str
    hashed_password: str
    email: str


class UserOutWithPassword(UserOut):
    hashed_password: str

class Userlogout(BaseModel):
    id: str
    username: str
    password: str
    token: str


class UserRepository:
    def get(self, username: int) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, hashed_password , email
                        FROM users
                        WHERE username = %s
                        """,
                        [username]
                    )
                    record = result.fetchone()
                    user = UserOut(
                        id=record[0],
                        username=record[1],
                        hashed_password=record[2],
                        email=record[3]
                        )
                    return user
        except Exception as e:
            print(e)
            return {"message": "could not get user"}

    def create(self, user: UserIn, hashed_password: str) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                        INSERT INTO users
                            (
                                username, hashed_password , email
                            )
                        VALUES
                            (%s,%s,%s)
                        RETURNING id;
                    """,
                    [
                        user.username,
                        hashed_password,
                        user.email,
                    ]
                )
                id = result.fetchone()[0]
                old_data = user.dict()
                return UserOutWithPassword(id=id, **old_data, hashed_password=hashed_password)


    def delete(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        RETURNING id
                        """,
                        [user_id]
                    )
                    id = result.fetchone()[0]
                    return {f"User {id} deleted": True}
        except Exception as e:
            print(e)
            return {"User deleted": False}

    def update(self, user_id:int, user: UserIn) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET username = %s
                            , hashed_password = %s
                            , email =  %s
                        WHERE id =  %s
                        """,
                        [
                            user.username,
                            user.password,
                            user.email,
                            user_id
                        ]
                    )
                    return self.user_into_out(user_id,user)
        except Exception as e:
            print(e)
            return {"User has not been updated"}


    def get_all(self) -> List[UserOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id, username, hashed_password, email
                        FROM users
                        """
                    )
                    result = db.fetchall()
                    return [UserOut(
                        id=id,
                        username=username,
                        hashed_password=hashed_password,
                        email=email)
                        for
                        id,
                        username,
                        hashed_password,
                        email
                        in result]
        except Exception as e:
            print(e)
            return {"Users not found"}


    def user_into_out(self,id:int, user:UserOut):
        old_data = user.dict()
        return UserOut(id=id, **old_data)
