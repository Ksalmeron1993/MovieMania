// import react from "react"
// import { useState } from "react"
//Added all the pages but might only use login, signup
//Potentially create a logout page? talk with group
import { NavLink, Link} from "react-router-dom";
// import { useAuthContext, useToken } from "./pages/Authentication";
//will make this nav look as if all the buttons are in the main page
//high chance to edit it
//just making an example from what I used in car-car project

function Nav() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              {/* <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sign in/Account
                            </a> */}
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li><Link className="dropdown-item" to="/AccountDetails/edit">Edit account</Link></li>
                {/* //if we make a logout it would be under "Account" dropdown
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Logout
                  </Link>
                </li>
                {/* <li><Link className="dropdown-item" to="/bookmarked">Bookmarked Movies</Link></li> */}
                {/* <li><Link className="dropdown-item" to="/mainpage">Sign In</Link></li> */}
              </ul>
            </li>
            {/* //after this, these lines arent for the nav bar at the Home Page, i just dont know yet how i would incorporate them to their respective pages
        //placeholders for now, discuss with group */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
            {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/moviedetail">
                                Movie detail
                            </NavLink>
                        </li> */}
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
