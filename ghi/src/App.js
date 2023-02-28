// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
// import './App.css';
// import Accountpage from './pages/Accountpage.js';
// import Bookmarked from './pages/Bookmarked.js';
// import Homepage from './pages/Homepage.js';
// import Mainpage from './pages/Mainpage.js';
// import Nav from './Nav.js';
// //last 3 i dont know if we would use them or how to inorporate them correctly yet
// import Login from './pages/Login.js';
// import Moviedetail from './pages/Moviedetail.js';
// import Signup from './pages/Signup.js';


// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
//       console.log('fastapi url: ', url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])

//   //this function app fetches all the data
//   //figure out with group what are all the data that needs to be fetched
//   //for example, one would be for the searchbox when searching a movie
//   //also when fetching effects, see if it will be an empty array which only calls on data once
//   //or a dependancy array such as the movie search box
//   function App() {

//   }

//   //using the effect

//   //this would be for the searchbox
//   //still need to create the data i think *_*
//   useEffect(() => {
//     fetchMovies(searchQuery);
//   }, [searchQuery]);

// //our JSX
// // some of these elements will contain fetchData in the future
//   return (
//     <BrowserRouter>
//       <Nav />
//         <div>
//           <ErrorNotification error={error} />
//           <Construct info={launch_info} />
//         </div>
//         <div className="container">
//           <Routes>
//             <Route path="/" element={<MovieMania />} />
//             <Route path="/homepage" element={<Homepage />} />
//             <Route path="/accountpage" element={<Accountpage />} />
//             <Route path="/bookmarked" element={<Bookmarked />} />
//             <Route path="/mainpage" element={<Mainpage />} />
//             //last 3 not sure just placeholders for now
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/moviedetail" element={<Moviedetail />} />
//             <Route path="/login" element={<Login />} />
//           </Routes>
//         </div>

//     </BrowserRouter>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import { useEffect } from "react";
// import './App.css';
// import SearchIcon from './search.svg';
// import MovieCard from "./MovieCard";


// //a5371ad6
// const API_URL = 'https://api.themoviedb.org/3/movie/{movie_name}?api_key=7d055fdafcdf398aab55d81760d1c151
// '

// const App =() =>{
//     const [movies, setMovies] = useState();
//     const [searchTerm, setSearchTerm] = useState('');
//     const searchMovies = async(title) => {
//         const response = await fetch(`${API_URL}&s=${title}`)
//         const data = await response.json()
//         setMovies(data.Search)
//     }

//     useEffect(() => {
//         searchMovies('Marvel');


//     },[]);


//     return (
//         <div className = 'app'>
//             <h1>Movie Mania</h1>
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

// import React, { useState } from "react";
// import { useEffect } from "react";
// import './App.css';
// import SearchIcon from './search.svg';
// import MovieCard from "./MovieCard";



// const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=7d055fdafcdf398aab55d81760d1c151&query=`;

// const App =() =>{
//     const [movies, setMovies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     const searchMovies = async(title) => {
//         const response = await fetch(`${API_URL}${title}`);
//         const data = await response.json();
//         setMovies(data.results);
//     }

//     useEffect(() => {
//         searchMovies('marvel');
//     },[]);

//     return (
//         <div className = 'app'>
//             <h1>Movie Mania</h1>
//             <div className ='search'>
//                 <input
//                     placeholder="Search for Movies"
//                     value ={searchTerm}
//                     onChange ={(e)=> setSearchTerm(e.target.value)}
//                 />
//                 <img
//                     src= {SearchIcon}
//                     alt = "search"
//                     onClick ={()=> searchMovies(searchTerm),
//                                 console.log(searchTerm)
//                     }
//                 />
//             </div>
//             {
//                 movies?.length > 0
//                     ?(
//                         <div className ='container'>
//                             {movies.map((movie) =>(
//                                 <MovieCard key={movie.id} movie={movie} />
//                             ))}
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

// export default App;

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


import React, { useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';



function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/movies/query=${query}`
      );

      const contentType = response.headers.get("content-type");
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
        {(movies|| []).map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
