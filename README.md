# Movie Mania
- Cierra Reese
- Mark Ipatzi
- Kevin Salmeron
- Michael Maloney
- Uzair Suleman

Experience movie madness with MOVIE MANIA!

Movie Mania is for those who love to watch movies and want to keep track of their favorites. You can search and browse movies, read their summaries, watch trailers, and see what services are allowing you to stream some of your favorite movies.

---

## Feature Functionality
- No matter if the user is logged in or logged out everyone will be able to see movies and their details
- Users will be able to sign up for an account
- Users will be able to log in and logout
- After logging in, users will be able to bookmark, view their bookmarks, delete bookmarks, and edit their account details
- Each user will be able to

---

## Design

- [API_Design](/docs/api-design.md)
- [Data_Model](/docs/datamodel.md)
- [GHI](/docs/ghi.md)
- [Integrations](/docs/integrations.md)

---

## Running the app

Thank you for your interest in running our Movie Mania application locally! Follow these simple steps to get started:

### Prerequisites
- Before running the application, make sure you have the following tools installed on your machine:

[Docker
Docker Compose
Steps](https://www.docker.com/products/docker-desktop/)


## Clone the Repository:

#### Copy code:
```
git clone https://github.com/Ksalmeron1993/MovieMania.git
```
Navigate to the Project Directory:
#### Copy code:
```
cd <repository-folder>
```
Set Up Docker Volumes:
We'll need to create Docker volumes for PostgreSQL and pgAdmin. Run the following commands:
#### Copy code:
```
docker volume create pg-admin
docker volume create postgres-data
```
Build the Docker Containers:
Build the Docker containers using Docker Compose:
#### Copy code:
```
docker-compose build
docker-compose up
```
This command will start all necessary services, including the web server and database.

### Access the Application:
Once the application is up and running, you can access it in your web browser at http://localhost:8000 or http://localhost:3000

### Explore the Application:
Feel free to explore the features of our Movie Mania application! You can view, search, and interact with movie data seamlessly.

### Shut Down the Application:
To stop the application and its services, press Ctrl + Z in the terminal where you ran docker-compose up. Then, run:
#### Copy code:
```
docker-compose down
```

### Additional Notes
If you encounter any issues during setup or while running the application, please don't hesitate to reach out to us for assistance.
Remember to clean up Docker volumes and containers when you're done experimenting with the application.
Enjoy your Movie Mania experience!

