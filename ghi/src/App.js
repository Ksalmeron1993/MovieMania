import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Construct from './Construct.js'
import ErrorNotification from './ErrorNotification';
import './styles/App.css';
import Accountpage from './pages/Accountpage';
import Bookmarked from './pages/Bookmarked';
import Homepage from './pages/Homepage';
import Mainpage from './pages/Mainpage';
import Nav from './Nav';
//last 3 i dont know if we would use them or how to inorporate them correctly yet
import Login from './pages/Login';
import Moviedetail from './pages/Moviedetail';
import Signup from './pages/Signup';


function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
      console.log('fastapi url: ', url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, [])

  //this function app fetches all the data
  //figure out with group what are all the data that needs to be fetched
  //for example, one would be for the searchbox when searching a movie
  //also when fetching effects, see if it will be an empty array which only calls on data once
  //or a dependancy array such as the movie search box

  //using the effect

  //this would be for the searchbox
  //still need to create the data i think *_*
  //useEffect(() => {
    //fetchMovies(searchQuery);
  //}, [searchQuery]);

//our JSX
// some of these elements will contain fetchData in the future
  return (
    <BrowserRouter>
      <Nav />
        <div>
          <ErrorNotification error={error} />
          <Construct info={launch_info} />
        </div>
        <div className="container">
          <Routes>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/accountpage" element={<Accountpage />} />
            <Route path="/bookmarked" element={<Bookmarked />} />
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/moviedetail" element={<Moviedetail />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
