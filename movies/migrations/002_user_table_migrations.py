steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            user_id serial not null primary key,
            first_name varchar(20) not null,
            last_name varchar(100) not null,
            email varchar(50) not null,
            username varchar(20) not null,
            password varchar(200) not null,
            );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ],
]
