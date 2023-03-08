from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo, UsersIn
from authenticator import authenticator

client = TestClient(app)

class FakeUsersRepo:
    def get_user_by_id(self, id):
        return {
            "id": 1,
            "first_name": "Apple",
            "last_name": "Sauce",
            "email": "apple@sauce.com",
            "username": "apple",
        }

def test_get_user_by_id():
    app.dependency_overrides[UsersRepo] = FakeUsersRepo
    response = client.get(
        "/users/get/1",
    )
    assert response.status_code == 200
    assert response.json() == {
            "id": 1,
            "first_name": "Apple",
            "last_name": "Sauce",
            "email": "apple@sauce.com",
            "username": "apple",
        }


class FakeAllUserRepo:
    def get_all_users(self):
        return [
            {
                "id": 1,
                "first_name": "po",
                "last_name": "po",
                "email": "po@pandas.com",
                "username": "panda",
            },
            {
                "id": 2,
                "first_name": "tigress",
                "last_name": "tigress",
                "email": "tigress@tigers.com",
                "username": "tiger",
            }
        ]
def test_all_users():
    app.dependency_overrides[UsersRepo] = FakeAllUserRepo
    response = client.get(
        "/get/all",
    )
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "first_name": "po",
            "last_name": "po",
            "email": "po@pandas.com",
            "username": "panda",
        },
        {
            "id": 2,
            "first_name": "tigress",
            "last_name": "tigress",
            "email": "tigress@tigers.com",
            "username": "tiger",
        }
    ]
