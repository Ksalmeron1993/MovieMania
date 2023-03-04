import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
// import './App.css';
// import Accountpage from './pages/Accountpage.js';
import Bookmarked from './pages/Bookmarked.js';
import HomePage from "./pages/Homepage.js";
import Mainpage from './pages/Mainpage.js';
import Nav from './Nav.js';
//last 3 i dont know if we would use them or how to inorporate them correctly yet
import Login from './pages/Login.js';
import Moviedetail from './pages/Moviedetail.js';
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

  return (
        <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <Nav />
            <div className="container">
              <Routes>
                {/* <Route path="/Bookmarked/:id" component={Moviedetail} /> */}
                {/* <Route path="/Bookmarked" element={<Bookmarked />} /> */}
                <Route path="/" element={<Mainpage/>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/AccountDetails" element={<AccountDetailView />} />
                <Route path="/movies/:id/detail" element={<Moviedetail />} /> // add a new Route for the Moviedetail component
                <Route path="/AccountDetails/edit" element={<AccountEditForm />} />
                <Route path="/AccountEdit" element={<AccountEditForm />} />
              </Routes>
            </div>
        </AuthProvider>
        </BrowserRouter>
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
