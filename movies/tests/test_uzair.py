from fastapi.testclient import TestClient # check fast api documentation for overrides
from main import app
from queries.bookmarks import BookmarkRepository
from authenticator import authenticator

client = TestClient(app)


class FakeBookmarkIDRepo:
    def get_bookmark_by_id(self, id):
        return {
        "user_id": 1,
        "movie_id": 1234,
        }
def test_get_a_bookmark():
    app.dependency_overrides[BookmarkRepository] = FakeBookmarkIDRepo
    response = client.get(
        "/bookmarks/get/1",
    )
    assert response.status_code == 200
    assert response.json() == {
        "user_id": 1,
        "movie_id": 1234,
}
