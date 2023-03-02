from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo, UsersIn

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



class CreateUserQueries:
    def create(self, user, hashed_password):
        result = {
            "first_name": "Apple",
            "last_name": "Sauce",
            "email": "apple@sauce.com",
            "username": "apple",
        }
        result.update(user)
        return result

def test_create_user():
    app.dependency_overrides[UsersRepo] = CreateUserQueries

    json = {
        "first_name": "Apple",
        "last_name": "Sauce",
        "email": "apple@sauce.com",
        "username": "apple",
        "password": "password",
    }

    expected = {
        "id": 1,
        "first_name": "Apple",
        "last_name": "Sauce",
        "email": "apple@sauce.com",
        "username": "apple",
        "hashed_password": "$2b$12$UTzkAvfrMs0.EEicbdn4BuOnZBWJybTSpcgU9OkkJ.ScTon/bUijq",
    }

    response = client.post("/signup", json=json)
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == expected
