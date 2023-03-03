import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
// import './App.css';
// import Accountpage from './pages/Accountpage.js';
import Bookmarked from './pages/Bookmarked.js';
import HomePage from "./pages/Homepage.js";
// import Mainpage from './pages/Mainpage.js';
import Nav from './Nav.js';
//last 3 i dont know if we would use them or how to inorporate them correctly yet
import Login from './pages/Login.js';
// import Moviedetail from './pages/Moviedetail.js';
// import MovieCard2 from "./MovieCard 2.js";
import Logout from "./pages/Logout.js";
import Signup from './pages/Signup.js';
import { AuthProvider, useToken } from "./pages/Authentication.js";
// import MovieCard2 from "./MovieCard 2.js";
import AccountDetailView from "./pages/Accountpage.js";
import AccountEditForm from "./pages/Accounteditpage.js";


function GetToken(){
  useToken()
  return null
}

function App() {
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

//our JSX
// some of these elements will contain fetchData in the future
  return (
    // <AuthProvider>
    //   <GetToken />
        <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <Nav />
            <div className="container">
              <Routes>
                {/* <Route path="/Bookmarked/:id" component={Moviedetail} /> */}
                {/* <Route path="/Bookmarked" element={<Bookmarked />} /> */}
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/AccountDetails" element={<AccountDetailView />} />
                <Route path="/AccountEdit" element={<AccountEditForm />} />
              </Routes>
            </div>
        </AuthProvider>
        </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;


// import React, { useState } from "react";
// import { useEffect } from "react";
// import './styles/App.css';
// import SearchIcon from './search.svg';
// import MovieCard from "./MovieCard.js";


// //a5371ad6
// const API_URL = 'http://www.omdbapi.com?apikey=a5371ad6'

// const App =() =>{
//     const [movies, setMovies] = useState();
//     const [searchTerm, setSearchTerm] = useState('');
//     const searchMovies = async(title) => {
//         const response = await fetch(`${API_URL}&s=${title}`)
//         const data = await response.json()
//         setMovies(data.Search)
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
