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


@import url("https://fonts.googleapis.com/css?family=Roboto+Slab:100,300,400,700");
@import url("https://fonts.googleapis.com/css?family=Raleway:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i");

* {
  margin: 0;
  border: 0;
  box-sizing: border-box;
}

:root {
  --font-roboto: "Roboto Slab", serif;
  --font-raleway: "Raleway", sans-serif;
}

body {
  font-family: var(--font-roboto);
  background-color: #212426;
}

.app {
  padding: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h1 {
  font-size: 3rem;
  letter-spacing: 0.9px;
  background: linear-gradient(
    90deg,
    rgba(249, 211, 180, 1) 0%,
    rgba(249, 211, 180, 0) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
}

.search {
  width: 71%;
  margin: 4rem 0 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1.5rem 1.75rem;
  border-radius: 3rem;
  background: #1f2123;
  -webkit-box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;
  box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;
}

.search input {
  flex: 1;
  border: none;
  font-size: 1.5rem;
  font-family: var(--font-raleway);
  font-weight: 500;
  padding-right: 1rem;

  outline: none;
  color: #a1a1a1;
  background: #1f2123;
}

.search img {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

/* .search button {
  padding: 20px 40px;
  border-radius: 0.5rem;
  margin-left: 15px;
  color: #a1a1a1;
  font-family: var(--font-raleway);
  font-weight: 900;
  letter-spacing: 0.75px;
  font-size: 1.25rem;
  cursor: pointer;
  background: #1f2123;
  -webkit-box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;
  box-shadow: 5px 5px 7px #1c1d1f, -5px -5px 7px #222527;
} */

.empty {
  width: 100%;
  margin-top: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
}

.empty h2 {
  font-size: 1.25rem;
  color: #f9d3b4;
  font-family: var(--font-raleway);
}

.container {
  width: 100%;
  margin-top: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.movie {
  width: 310px;
  height: 460px;
  margin: 1.5rem;

  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: none;

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  box-shadow: 0px 13px 10px -7px rgba(0, 0, 0, 0.1);
}

.movie div:nth-of-type(1) {
  position: absolute;
  padding: 16px;
  width: 100%;
  opacity: 0;
  top: 0;
  color: #f9d3b4;
}

.movie:hover {
  box-shadow: 0px 30px 18px -8px rgba(0, 0, 0, 0.1);
  transform: scale(1.05, 1.05);
}

.movie div:nth-of-type(2) {
  width: 100%;
  height: 100%;
}

.movie div:nth-of-type(2) img {
  height: 100%;
  width: 100%;
}

.movie div:nth-of-type(3) {
  z-index: 2;
  background-color: #343739;
  padding: 16px 24px 24px 24px;

  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.movie div:nth-of-type(3) span {
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: 500;
  color: #f0f0f0;
}

.movie div:nth-of-type(3) h3 {
  margin-top: 5px;
  font-family: "Roboto Slab", serif;
  color: #f9d3b4;
}

.movie:hover div:nth-of-type(2) {
  height: 100%;
  opacity: 0.3;
}

.movie:hover div:nth-of-type(3) {
  background-color: transparent;
}

.movie:hover div:nth-of-type(1) {
  opacity: 1;
}

@media screen and (max-width: 600px) {
  .app {
    padding: 4rem 2rem;
  }

  .search {
    padding: 1rem 1.75rem;
    width: 100%;
  }

  .search input {
    font-size: 1rem;
  }

  .search img {
    width: 20px;
    height: 20px;
  }
}

@media screen and (max-width: 400px) {
  .app {
    padding: 4rem 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .container {
    margin-top: 2rem;
  }

  .movie {
    width: "100%";
    margin: 1rem;
  }
}

