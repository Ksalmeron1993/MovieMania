import { useEffect, useState } from "react";
import { useAuthContext, useToken } from "./Authentication";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
//import "./PostList.css";

function Bookmarkedmovies() {
  const [bookmarks, setBookmarks] = useState([]);
  const [movies, setMovies] = useState([]);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const fetchData = async () => {
    const url = `http://localhost:8000/users/get/${token.user.id}`;
    const fetchConfig = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const data = await response.json();
      setMovies(data);
      console.log(data)
    }
  };
  console.log(response)

  const getBookmarks = async () => {
    const url = "http://localhost:8000/movies";
    const response = await fetch(url);
    if (response.ok) {
      const bookmark = await response.json();
      setBookmarks(bookmark);
      console.log(bookmark, "bookmark")
    }
  };
  console.log("bookmark", bookmarks)

  const handleBookmark = (movie) => {
    if (!bookmarks.includes(movie)) {
      setBookmarks([...bookmarks, movie]);
    }
  };

  const handleRemoveBookmark = (movie) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark !== movie));
  };

  useEffect(() => {
    fetchData();
    getBookmarks();
    if (token === false) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Movie Bookmarks</h1>

      <div className="movies-container">
        {bookmarks.length > 0 ? (
          bookmarks.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} />
              <button onClick={() => handleRemoveBookmark(movie)}>
                Remove Bookmark
              </button>
            </div>
          ))
        ) : (
          <p>No bookmarks yet!</p>
        )}
      </div>

      <h2>Discover Movies</h2>

      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
            <button onClick={() => handleBookmark(movie)}>
              Add Bookmark
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookmarkedmovies;
