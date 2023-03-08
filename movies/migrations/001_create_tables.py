steps = [
    [
        # "Up" SQL statement - Users Table
        """
        CREATE TABLE users (
            id serial not null primary key,
            first_name varchar(20) not null,
            last_name varchar(100) not null,
            email varchar(50) not null,
            username varchar(20) not null,
            hashed_password varchar(200) not null
            );
        """,
        # "Down" SQL statement - Users Table
        """
        DROP TABLE users;
        """,
    ],
    [
        # "Up" SQL statement - Movies Table
        """
        CREATE TABLE movies (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            director VARCHAR(255),
            release_date DATE,
            genre VARCHAR(255),
            runtime INT,
            plot_summary TEXT
        );
        """,
        # "Down" SQL statement - Movies Table
        """
        DROP TABLE movies;
        """,
    ],
    [
        # "Up" SQL statement - Bookmarks table
        """
    CREATE TABLE bookmarks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        movie_id INTEGER NOT NULL
    );
    """,
        # "Down" SQL statement - Bookmarks table
        """
    DROP TABLE bookmarks;
    """,
    ],
]
