import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.js";
import Mainpage from "./pages/Mainpage.js";
import Nav from "./Nav.js";
import Login from "./pages/Login.js";
import Moviedetail from "./pages/Moviedetail.js";
import Logout from "./pages/Logout.js";
import Signup from "./pages/Signup.js";
import { AuthProvider, useToken } from "./pages/Authentication.js";
// import MovieCard2 from "./MovieCard 2.js";
import AccountDetailView from "./pages/Accountpage.js";
import AccountEditForm from "./pages/Accounteditpage.js";
import Bookmarkedmovies from "./pages/Bookmarked.js";

function GetToken() {
  useToken();
  return null;
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
            <Route path="/Bookmarkedmovies" element={<Bookmarkedmovies />} />
            <Route path="/" element={<Mainpage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/AccountDetails" element={<AccountDetailView />} />
            <Route path="/movies/:id/detail" element={<Moviedetail />} /> 
            <Route path="/AccountDetails/edit" element={<AccountEditForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
