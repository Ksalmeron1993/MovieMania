from fastapi.testclient import TestClient
from main import app
from queries.users import UsersRepo

client = TestClient(app)

class FakerUsersRepo:
    def get_user_by_id(self, id)

class test_get_all():
    app.dependency_overrides[UsersRepo]
