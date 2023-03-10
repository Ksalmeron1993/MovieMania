from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo

client = TestClient(app)


class FakeAllUserRepo:
    def get_all_users(self):
        return [
            {
                "id": 1,
                "first_name": "Po",
                "last_name": "Panda",
                "email": "pa@panda.com",
                "username": "panda",
            },
            {
                "id": 2,
                "first_name": "Tigress",
                "last_name": "Tiger",
                "email": "tigress@tiger.com",
                "username": "tiger",
            },
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
            "first_name": "Po",
            "last_name": "Panda",
            "email": "pa@panda.com",
            "username": "panda",
        },
        {
            "id": 2,
            "first_name": "Tigress",
            "last_name": "Tiger",
            "email": "tigress@tiger.com",
            "username": "tiger",
        },
    ]
