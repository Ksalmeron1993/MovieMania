# API Designs


### Sign Up
- Endpoint path: /token
- Endpoint method: `POST`

- Request shape (form):

  - first name: string
  - last name: string
  - email: string
  - username: string
  - password: string

- Response: Account information and a token
- Response shape (JSON):
  ```json
  {
    "access_token": "string",
    "token_type": "Bearer",
    "user": {
        "id": "string",
        "first_name": "string",
        "last_name": "string",
        "email": "string",
        "username": "string",
        "hashed_password": "string"
    }
  }
  ```

### Log in
- Endpoint path: /token
- Endpoint method: `PUT`

- Request shape (JSON):

  - username: string
  - password: string

- Response: User access token
- Response shape (JSON):
  ```json
  {
    "access_token": "string",
    "token_type": "Bearer"
  }
  ```

### Log Out
- Endpoint path: /token
- Endpoint method: `DELETE`

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true

### Update A User
- Endpoint path: /users{id}
- Endpoint method: `POST`

- Request shape (form):

  - username: string
  - password: string

- Response shape (JSON):
  ```json
  {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string",
    "password": "string"

  }
  ```

  ### Delete A User
- Endpoint path: /users/delete/{id}
- Endpoint method: `DELETE`

- Request shape (form):

- Response shape (JSON):
  ```json
  {
    "id": "string",

  }
  ```

  ### Get All Users
- Endpoint path: /get/all
- Endpoint method: `GET`

- Request shape (form):

  - username: string
  - password: string

- Response shape (JSON):
  ```json
  {
    "id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "username": "string"

  }
  ```

### Create a bookmark
- Endpoint path: /movies/bookmarks/{user_id}
- Endpoint method: `POST`

-Request shape (form):
  ```json
  {
    "user_id": "int",
    "movie_id" : "int",
    "id" : "int",
  }
  ```

### Get all bookmarks for all users
- Endpoint path: /movies/bookmarks/all
- Endpoint method: `GET`

-Request shape (form):
- Response : To get all bookmarks for all users
  ```json
  {
    "id": "int",
    "user_id": "int",
    "movie_id" : "int",
  }
  ```

### Get a bookmark by bookmark id
- Endpoint path: /bookmarks/get/{id}
- Endpoint method: `GET`

-Request shape (form):
  ```json
  {
    "id": "int",
  }
  ```
### Get all bookmarks for a user
- Endpoint path : /bookmarks/get/all/{user_id}/
- Endpoint method: `GET`

-Request shape (form):
  ```json
  {
    "id": "int",
    "user_id": "int",
    "movie_id" : "int"
  }
  ```

### Delete A Bookmark
- Endpoint path: /bookmarks/delete/{movie_id}
- Endpoint method: `GET`

-Request shape (form):
  ```json
  {
    "movie_id" : "int",
  }
  ```
