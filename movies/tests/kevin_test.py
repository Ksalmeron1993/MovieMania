from fastapi.testclient import (
    TestClient,
)  # check fast api documentation for overrides
from main import app
from queries.bookmarks import BookmarkRepository


client = TestClient(app)

# class EmptyUserQueries:
#     def get_all(self):
#         return []


class FakeBookmarkRepo:
    def get_all_bookmarks(self):
        return {
            "id": 1,
            "user_id": "Kevin",
            "movie_id": "50",
        }


def test_get_all_bookmarks():
    app.dependency_overrides[BookmarkRepository] = FakeBookmarkRepo
    response = client.get(
        "/movies/bookmarks/all",
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "user_id": "Kevin",
        "movie_id": "50",
    }
