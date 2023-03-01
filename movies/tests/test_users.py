from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo

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


def test_get_all():
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
