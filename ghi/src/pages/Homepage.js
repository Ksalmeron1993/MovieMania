import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../App.css"

function HomePage() {
  const [movieName, setmovieName] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/movies/${movieName}`).then((response) => response.json()).then((data) => {setMovies(data)}, console.log(movies))
    } catch (error) {
      console.log(error);
      setMovies([]);
    }
  };

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await fetch(`http://localhost:8000/popular/`).then((response) => response.json()).then((data) => {setMovies(data)}, console.log(movies))
      } catch (error) {
        console.log(error);
        setMovies([]);
      }
    }

    getPopularMovies();
  }, []);

  return (
    <div className="container">
      <h1 className="title">React Movie Search</h1>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="movieName">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={movieName}
          onChange={(e) => setmovieName(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies?.map((movie) =>
          <MovieCard key={movie.id} movie={movie} />
        )}
      </div>
    </div>
  );
}

export default HomePage;
