// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import MovieCard from "../MovieCard";

// function MovieDetail() {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     async function fetchMovieDetails() {
//       try {
//         const response = await fetch(`http://localhost:8000/movies/${movie.id}`);
//         const data = await response.json();
//         setMovie(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchMovieDetails();
//   }, [movieId]);

//   return (
//     <div className="movie-detail-container">
//       <div className="movie-detail-card">
//         <MovieCard movie={movie} />
//       </div>
//       <div className="movie-detail-info">
//         <h2>{movie.title}</h2>
//         <p>{movie.overview}</p>
//         <p>Release date: {movie.release_date}</p>
//       </div>
//     </div>
//   );
// }

// export default MovieDetail;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import MovieCard from "../MovieCard";
// import "../styles/Moviedetail.css";


// function MovieDetail() {
//   const { movieId } = useParams();
//   const [movie, setMovie] = useState({});
//   const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;


//   useEffect(() => {
//     async function fetchMovieDetails() {
//       try {
//         const response = await fetch(`http://localhost:8000/movies/${movie.id}`);
//         const data = await response.json();
//         setMovie(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchMovieDetails();
//   }, [movieId]);

//   return (
//     <div className="movie-detail-container">
//       <div className="movie-card-container">
//         <MovieCard movie={movie} />
//       </div>
//       <div className="movie-detail-info-container">
//         <h2>{movie.title}</h2>
//         <p>{movie.overview}</p>
//         <p>Release date: {movie.release_date}</p>
//       </div>
//     </div>
//   );
// }

// export default MovieDetail;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import MovieCard from "../MovieCard";
// import "../styles/Moviedetail.css";

// function MovieDetail() {
//   const { movieId } = useParams();
//   const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
//   const [movie, setMovie] = useState({
//     title: "",
//     overview: "",
//     release_date: "",
//     poster_path: "",
//     backdrop_path: "",
//     vote_average: 0,
//     runtime: 0,
//     genres: [],
//   });

//   useEffect(() => {
//     async function fetchMovieDetails() {
//       try {
//         const response = await fetch(`http://localhost:8000/movies/${movieId}`);
//         const data = await response.json();
//         setMovie(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchMovieDetails();
//   }, [movieId]);
//     useEffect(() => {
//   console.log(movie);
//     }, [movie]);

//   return (
//     <div className="movie-detail-container">
//       <div className="movie-detail-card">
//         <MovieCard movie={movie} />

//       </div>
//       <div className="movie-detail-info">
//         <h2>{movie.title}</h2>
//         <p>{movie.overview}</p>
//         <div></div>
//         <p>Release date: {movie.release_date}</p>
//         <p>{imageUrl}</p>

//       </div>
//     </div>
//   );
// }

// export default MovieDetail;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import MovieCard from "../MovieCard";
// import "../styles/Moviedetail.css";

// function MovieDetail(props) {
//   const [videos, setVideos] = useState([]);
//   const {id} = useParams();
//   console.log("movie id" ,id)
//   const [movie, setMovie] = useState({
//     title: "",
//     overview: "",
//     release_date: "",
//     poster_path: "",
//     backdrop_path: "",
//     vote_average: 0,
//     runtime: 0,
//     genres: [],
//   });

//   useEffect(() => {
//     async function fetchMovieDetails() {
//       try {
//         const response = await fetch(`http://localhost:8000/movies/${id}/detail`);
//         const data = await response.json();
//         setMovie(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchMovieDetails();
//   }, [id]);
//   useEffect(() => {
//     console.log(id);
//   }, [movie]);
//   useEffect(() => {
//     console.log(movie);
//   }, [movie]);
//   useEffect(() => {
//   async function fetchVideos() {
//     try {
//       const response = await fetch(`http://localhost:8000/movies/${id}/videos`);
//       const data = await response.json();
//       setVideos(data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   fetchVideos();
// }, [id]);

//   return (
//     <div className="movie-detail-container">
//   <div className="movie-detail-card">
//     <MovieCard movie={movie} />
//   </div>
//   <div className="movie-detail-info">
//     <h2>{movie.title}</h2>
//     <p>{movie.overview}</p>
//     {movie.poster_path && (
//       <img
//         src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//         alt={movie.title}
//       />
//     )}
//     <p>Release date: {movie.release_date}</p>
//     <div>
//       <h3>Videos</h3>
//       {videos.map((video) => (
//         <div key={video.id}>
//           <p>{video.name}</p>
//           <iframe
//             src={`https://www.youtube.com/embed/${video.key}`}
//             title={video.name}
//             width="560"
//             height="315"
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>

//   );
// }

// export default MovieDetail;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../styles/Moviedetail.css";
import { useAuthContext } from "./Authentication";


function Moviedetail(props) {
  const {id} = useParams();
  console.log("movie id" ,id)
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
        const response = await fetch(`http://localhost:8000/movies/${id}/detail`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMovieDetails();
  }, [id]);

  const handleBookmark = async (token) => {
  console.log("TOKEN" , token);
  if (!token) {
    alert("Please log in to bookmark a movie.");
    return;
  }

  console.log("id:", id);
  console.log("user_id:", token.user.id);

  const bookmarkData = {
    movie_id: id,
    user_id: token.user.id
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
  console.log("response", response)
  if (response.ok) {
    alert("Movie bookmarked!");
  } else {
    alert("Error adding movie to bookmarks.");
  }
};


  useEffect(() => {
    console.log(id);
  }, [movie]);
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
         {token && (
          <button onClick={() => handleBookmark(token)}>Bookmark Movie</button>
        )}
      </div>
    </div>
  );
}
export default Moviedetail;

