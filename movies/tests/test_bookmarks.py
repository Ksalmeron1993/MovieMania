# from fastapi.testclient import TestClient
# check fast api documentation for overrides
# from main import app
# from queries.users import UsersRepo
# # from queries.bookmarks import BookmarkRepository

# client = TestClient(app)

# class EmptyUserQueries:
#     def get_all(self):
#         return []

# # class EmptyBookmarkQueries:
# #     def get_all(self):
# #         return []

# # class CreateBookmark:
# #     def create(self, bookmark):
# #         result = {
# #             "id":
# #             ""
# #         }
# #         return result

# def test_get_all_users():
#     # Arrange
#     app.dependency_overrides[UsersRepo] = EmptyUserQueries
#     response = client.get("/get/all")
#     # Act
#     app.dependency_overrides = {}
#     # Assert
#     assert response.status_code == 200
#     assert response.json() == {"users": []}

# # def test_get_all_bookmarks():
# #     # Arrange
# #     app.dependency_overrides[BookmarkRepository] = EmptyBookmarkQueries
# #     response = client.get("/movies/bookmarks/")
# #     # Act
# #     app.dependency_overrides = {}
# #     # Assert
# #     assert response.status_code == 200
# #     assert response.json() == {"bookmarks": []}
