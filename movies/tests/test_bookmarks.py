from fastapi.testclient import TestClient 
from main import app
from queries.bookmarks import BookmarkRepository

client = TestClient(app)
    
class EmptyBookmarkQueries:
    def get_all_bookmarks(self):
        return []
    
# class CreateBookmark:
#     def create(self, bookmark):
#         result = {
#             "user_id": 1,
#             "movie_id": 1,
#             "bookmark_date": "2023-03-01"
#         }
#         return result

def test_get_all_movies():
    # Arrange
    app.dependency_overrides[BookmarkRepository] = EmptyBookmarkQueries
    response = client.get("/movies/bookmarks/")
    # Act 
    app.dependency_overrides = {}
    # Assert
    assert response.status_code == 200
    assert response.json() == {"bookmarks": []}
