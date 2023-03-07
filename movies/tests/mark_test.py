from fastapi.testclient import TestClient # check fast api documentation for overrides
from main import app
from queries.bookmarks import BookmarkRepository
from authenticator import authenticator

client = TestClient(app)

class FakeUserBookmarkRepo:
    def get_all_user_bookmarks(self, user_id):
        return {
            "user_id": 1,
            "movie_id": 1,
        }
def test_get_all_user_bookmarks():
    app.dependency_overrides[BookmarkRepository] = FakeUserBookmarkRepo
    response = client.get(
        "/bookmarks/get/all/1/",
    )
    assert response.status_code == 200
    assert response.json() == {
        "user_id": 1,
        "movie_id": 1,
    }
