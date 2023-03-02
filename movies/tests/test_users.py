from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo, UsersIn
from authenticator import authenticator

client = TestClient(app)

# class FakeUsersRepo:
#     def get_user_by_id(self, id):
#         return {
#             "id": 1,
#             "first_name": "Apple",
#             "last_name": "Sauce",
#             "email": "apple@sauce.com",
#             "username": "apple",
#         }



# def test_get_user_by_id():
#     app.dependency_overrides[UsersRepo] = FakeUsersRepo
#     response = client.get(
#         "/users/get/1",
#     )
#     assert response.status_code == 200
#     assert response.json() == {
#             "id": 1,
#             "first_name": "Apple",
#             "last_name": "Sauce",
#             "email": "apple@sauce.com",
#             "username": "apple",
#         }



class CreateUserQueries:
    def create(self, user, hashed_password):
        result = {
            "first_name": "Apple",
            "last_name": "Sauce",
            "email": "apple@sauce.com",
            "username": "apple",
            "hashed_password": "$2b$12$UTzkAvfrMs0.EEicbdn4BuOnZBWJybTSpcgU9OkkJ.ScTon/bUijq",
        }
        result.update(user)
        return result
    # def get_user(self, id):
    async def get_user(self, id):
        account = await self.get_account_data("Apple", authenticator.get_account_getter)
        # user = {
        #     "id": 1,
        #     "first_name": "Apple",
        #     "last_name": "Sauce",
        #     "email": "apple@sauce.com",
        #     "username": "apple",
        #     "hashed_password": "$2b$12$UTzkAvfrMs0.EEicbdn4BuOnZBWJybTSpcgU9OkkJ.ScTon/bUijq",
        # }
        return account
def test_create_user():
    app.dependency_overrides[UsersRepo] = CreateUserQueries

    json = {
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "username": "string",
        "password": "string",
    }

    expected = {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlZDljZGQ5OC0zNDBmLTQ1ODgtYmI2ZS1mNDUxOGQ1MDliNDAiLCJleHAiOjE2Nzc3ODg4ODQsInN1YiI6InN0cmluZyIsImFjY291bnQiOnsiaWQiOjYsImZpcnN0X25hbWUiOiJzdHJpbmciLCJsYXN0X25hbWUiOiJzdHJpbmciLCJlbWFpbCI6InN0cmluZyIsInVzZXJuYW1lIjoic3RyaW5nIn19.1kingr_6eZYMPn7ATwXrTAiCxPCLgL4Lt_cJWODOG1g",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string",
    "hashed_password": "$2b$12$6ALklIn4YicEXh5Y1oQtROa04DkkOdzsZGBbnY5YWEknGSVjvipQ2"
  }
}
    response = client.post("/signup", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
