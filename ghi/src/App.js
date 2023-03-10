import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage.js";
import Mainpage from "./pages/Mainpage.js";
import Nav from "./Nav.js";
import Login from "./pages/Login.js";
import Moviedetail from "./pages/Moviedetail.js";
import Logout from "./pages/Logout.js";
import Signup from "./pages/Signup.js";
import { AuthProvider, useToken } from "./pages/Authentication.js";
import AccountDetailView from "./pages/Accountpage.js";
import AccountEditForm from "./pages/Accounteditpage.js";
import Bookmarkedmovies from "./pages/Bookmarked.js";
import "./App.css";

function GetToken() {
  useToken();
  return null;
}
const domain = /https:\/\/[^/]+/;
const basename = process.env.PUBLIC_URL.replace(domain, "");

function App() {
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
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
