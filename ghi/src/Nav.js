// import react from "react"
// import { useState } from "react"
//Added all the pages but might only use login, signup
//Potentially create a logout page? talk with group
import { NavLink, Link} from "react-router-dom";
import { useAuthContext, useToken } from "./pages/Authentication";
import "./navbar.css"
//will make this nav look as if all the buttons are in the main page
//high chance to edit it
//just making an example from what I used in car-car project

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-column">
          <li className="nav-item">
            <NavLink
              className="nav-link active"
              aria-current="page"
              to="/homepage"
            >
              Homepage
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link active"
              aria-current="page"
              to="AccountDetails"
            >
              Account info
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Bookmarkedmovies">
                  Bookmarked Movies
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/signup">
              Signup
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Log in
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
