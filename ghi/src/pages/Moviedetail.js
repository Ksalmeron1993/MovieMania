import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../styles/Moviedetail.css";
import { useAuthContext } from "./Authentication";

function MovieDetail(props) {
  const [videos, setVideos] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const { id } = useParams();
  console.log("movie id", id);
  const [movie, setMovie] = useState({
    title: "",
    overview: "",
    release_date: "",
    poster_path: "",
    backdrop_path: "",
    vote_average: 0,
    runtime: 0,
    genres: [],
  });
  const { token } = useAuthContext();
  console.log("TOKEN", token);
  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `http://localhost:8000/movies/${id}/detail`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovieDetails();
  }, [id]);
  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch(
          `http://localhost:8000/movies/${id}/videos`
        );
        const data = await response.json();
        setVideos(data.results.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    }

    fetchVideos();
  }, [id]);

  useEffect(() => {
    async function fetchWatchProviders() {
      try {
        const response = await fetch(
          `http://localhost:8000/movies/${id}/watch-providers`
        );
        const data = await response.json();
        setWatchProviders(data.results.US?.flatrate.slice(0, 5) || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWatchProviders();
  }, [id]);

  const handleBookmark = async (token) => {
    console.log("TOKEN", token);
    if (!token) {
      alert("Please log in to bookmark a movie.");
      return;
    }
    console.log("id:", id);
    console.log("user_id:", token.user.id);
    const bookmarkData = {
      movie_id: id,
      user_id: token.user.id,
    };
    console.log("BOOKMARK DATA", bookmarkData);
    const url = `http://localhost:8000/movies/bookmarks/${token.user.id}`;
    if (!token.user.id) {
      alert("User ID is undefined.");
      return;
    }
    console.log("URL", url);
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify(bookmarkData),
    };
    console.log("FETCHCONFIG", fetchConfig);
    const response = await fetch(url, fetchConfig);
    console.log("response", response);
    if (response.ok) {
      alert("Movie bookmarked!");
    } else {
      alert("Error adding movie to bookmarks.");
    }
  };
  useEffect(() => {
    console.log(id);
  }, [movie, id]);
  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-card">
        <MovieCard movie={movie} />
      </div>
      <div className="movie-detail-info">
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        )}
        <p>Release date: {movie.release_date}</p>
        <div>
          <h3>Videos</h3>
          {videos.map((video) => (
            <div key={video.id}>
              <p>{video.name}</p>
              <iframe
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                width="560"
                height="315"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
        <div>
          <h3>Where to Watch</h3>
          {watchProviders.length > 0 ? (
            <ul>
              {watchProviders.map((provider) => (
                <li key={provider.provider_id}>{provider.provider_name}</li>
              ))}
            </ul>
          ) : (
            <p>Watch providers not available</p>
          )}
          {token && (
            <button onClick={() => handleBookmark(token)}>
              Bookmark Movie
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
