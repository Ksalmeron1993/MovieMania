# Data Models

## Users Table

| Name     | Type    | unique|  optional  |
| ---------|--------| ----- | ----------   |
| id       | integer  |  yes   |    no      |
| first_name    | string  |  no   |    no      |
| last_name | string  |  no   |    no      |
| username | string  |  no   |    no      |
| hashed_password | string  |  no   |    no      |



## Bookmarks Table

| Name        | Type   | unique|  optional  |
| ------------- |------| ----- | ---------- |
| id          | integer    |  yes   |    no     |
| user_id    | integer    |  yes   |    no     |
| movie_id |      integer   |  yes   |    no    |
