import { NavLink, Link } from "react-router-dom";
import "./navbar.css";
import moviemania from "../src/images/moviemania.png";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="logo">
          <img class="Logo" src={moviemania} alt="Logo" />
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 home-bookm">
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
                to="/Bookmarkedmovies"
              >
                Bookmarks
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle account-dd"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/AccountDetails">
                    Account info
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/logout">
                    Sign Out
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
