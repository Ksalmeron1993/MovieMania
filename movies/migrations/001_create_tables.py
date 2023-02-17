steps = [
    [
        # "Up" SQL statement - Movies Table
        """
        CREATE TABLE movies (
            id SERIAL PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            release_year INTEGER NOT NULL,
            genre TEXT NOT NULL,
            duration_minutes INTEGER,
            director TEXT NOT NULL,
            imdb_rating DECIMAL(3, 1),
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        """,
        # "Down" SQL statement - Movies Table
        """
        DROP TABLE movies;
        """,
    ],
    [
        # "Up" SQL statement - Genres Table
        """
        CREATE TABLE movie_genres (
            id SERIAL PRIMARY KEY,
            genre_name TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        """,
        # "Down" SQL statement - Genres Table
        """
        DROP TABLE movie_genres;
        """,
    ],
    
       