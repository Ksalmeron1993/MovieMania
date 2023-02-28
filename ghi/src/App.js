import React, { useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

// function App() {
//   const [query, setQuery] = useState('');
//   const [movies, setMovies] = useState([]);

//   const searchMovies = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         `http://localhost:3000/movies?query=${query}`
//       );

//       const data = await response.json();
//       console.log(data);
//       setMovies(data.results);
//     } catch (error) {
//       console.log(error);
//     }
//   };

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/movies?query=${query}`
      );

      const contentType = response.headers.get(
        "content-type",
        "application/json"
      );
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response is not JSON");
      }

      const data = await response.json();

      console.log(data);
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
      setMovies([]);
    }
  };

  return (
    <div className="container">
      <h1 className="title">React Movie Search</h1>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {(movies || []).map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
