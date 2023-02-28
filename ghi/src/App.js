import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";

function App() {
  const [movieName, setmovieName] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/movies/${movieName}`);

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Response is not JSON");
      }

      const data = await response.json();

      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      setMovies([]);
    }
  };
  useEffect(() => {
    searchMovies({ preventDefault: () => {} }, "Marvel");
    // eslint-disable-next-line
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
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;


// import React, { useState } from "react";
// import { useEffect } from "react";
// import './App.css';
// import SearchIcon from './search.svg';
// import MovieCard from ''./MovieCard';


// //a5371ad6
// const API_URL = `http://localhost:8000/movies/`

// const App =() =>{
//     const [movies, setMovies] = useState();
//     const [searchTerm, setSearchTerm] = useState('');
//     const searchMovies = async(title) => {
//         const response = await fetch(`${API_URL}&s=${title}`)
//         const data = await response.json()
//         setMovies(data.Search)
//         console.log(data);
//     }

//     useEffect(() => {
//         searchMovies('Marvel');



//     },[]);


//     return (
//         <div className = 'app'>
//             <h1> Uzairs Movies</h1>
//             <div className ='search'>
//                 <input
//                     placeholder="Search for Movies"
//                     value ={searchTerm}
//                     onChange ={(e)=> setSearchTerm(e.target.value)}
//                 />
//                 <img
//                     src= {SearchIcon}
//                     alt = "search"
//                     onClick ={()=> searchMovies(searchTerm)}

//                 />

//             </div>
//             {
//                 movies?.length > 0
//                     ?(
//                         <div className ='container'>
//                             {movies.map((movie) =>(
//                                 <MovieCard movie={movie} />
//                             ))

//                             }

//                         </div>


//                     ) : (
//                         <div className ='empty'>
//                             <h2>No Movies Found </h2>
//                         </div>
//                     )
//             }

//         </div>

//     );
// }

// export default App

// import React, { useState, useEffect } from "react";
// import MovieCard from "./MovieCard";
// import "./App.css";

// const searchMovies = async (movieName, setMovies) => {
//   try {
//     const response = await fetch(
//       `http://localhost:8000/movies/${movieName}`
//     );

//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       throw new TypeError("Response is not JSON");
//     }

//     const data = await response.json();

//     if (data.results) {
//       setMovies(data.results);
//     } else {
//       setMovies([]);
//       console.log(data)
//     }
//   } catch (error) {
//     console.log(error);
//     setMovies([]);
//   }
// };

// function App() {
//   const [movieName, setmovieName] = useState("");
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     searchMovies("Marvel", setMovies);
//   }, []);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await searchMovies(movieName, setMovies);
//   };

//   return (
//     <div className="container">
//       <h1 className="title">React Movie Search</h1>
//       <form className="form" onSubmit={handleSubmit}>
//         <label className="label" htmlFor="movieName">
//           Movie Name
//         </label>
//         <input
//           className="input"
//           type="text"
//           name="query"
//           placeholder="i.e. Jurassic Park"
//           value={movieName}
//           onChange={(e) => setmovieName(e.target.value)}
//         />
//         <button className="button" type="submit">
//           Search
//         </button>
//       </form>
//       <div className="card-list">
//         {movies.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
