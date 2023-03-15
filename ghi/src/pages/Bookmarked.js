import React, { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "./Authentication";
import { useNavigate } from "react-router-dom";
import MovieCard3 from "./Moviecard3";
import { useParams } from "react-router-dom";
import "../styles/Bookmarked.css"


function Bookmarkedmovies(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [setSelectedMovie] = useState([]);
  const { id } = useParams();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    if (token?.user?.id) {
      const url = `${process.env.REACT_APP_MOVIES_SERVICE_API_HOST}/users/get/${token.user.id}`;
      const fetchConfig = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, fetchConfig);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    }
  }, [token]);
  const getBookmarks = useCallback(async () => {
    if (token?.user?.id) {
      const url = `${process.env.REACT_APP_MOVIES_SERVICE_API_HOST}/bookmarks/get/all/${token.user.id}/`;
      const response = await fetch(url);
      if (response.ok) {
        const bookmark = await response.json();
        const movies = await Promise.all(
          bookmark.map(async (b) => {
            const url = `https://api.themoviedb.org/3/movie/${b.movie_id}?api_key=7d055fdafcdf398aab55d81760d1c151`;
            const movieResponse = await fetch(url);
            const movie = await movieResponse.json();
            return { ...movie, id: b.id };
          })
        );
        const bookmarkWithMovies = bookmark.map((b, i) => {
          const movie = movies[i];
          return { ...b, movie };
        });
        setBookmarks(bookmarkWithMovies);
      }
    }
  }, [token]);
  const handleRemoveBookmark = async (movie) => {
    const url = `${process.env.REACT_APP_MOVIES_SERVICE_API_HOST}/bookmarks/delete/${movie.id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== movie.id));
    }
  };
  const handleMovieClick = useCallback(
    async (movieId) => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
      const response = await fetch(url);
      if (response.ok) {
        const movie = await response.json();
        setSelectedMovie(movie);
      }
    },
    [setSelectedMovie]
  );
  useEffect(() => {
    if (token === false) {
      navigate("/login");
    } else {
      fetchData(token).then(() => {
        getBookmarks();
      });
    }
  }, [token, id, navigate, fetchData, getBookmarks]);
  return (
    <div>
      <h1 className="movie-bookmarks-title">Movie Bookmarks</h1>
      <div className="movies-container">
        <div className="card-list">
          {bookmarks.length > 0 ? (
            bookmarks.map((movie) => (
              <div key={movie.id}>
                <MovieCard3
                  movie={movie}
                  onClick={() => handleMovieClick(movie.id)}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveBookmark(movie)}
                >
                  Remove Bookmark
                </button>
                <p>{movie.title}</p>
              </div>
            ))
          ) : (
            <p>No bookmarks yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Bookmarkedmovies;

