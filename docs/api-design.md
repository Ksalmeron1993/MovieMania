# API Designs


### Sign Up
- Endpoint path: /token
- Endpoint method: POST

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
        "id": 3,
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
- Endpoint method: POST

- Request shape (form):

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
- Endpoint method: DELETE

- Headers:

  - Authorization: Bearer token

- Response: Always true
- Response shape (JSON):
  ```json
  true
