import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../../../context/authContext";

const Navbar = () => {
  const { isAuthenticated, signout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MERN Skeleton
        </Link>
        <div className="navbar-links">
          <Link to="/users" className="navbar-link">
            USERS
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="navbar-link">
                MY PROFILE
              </Link>
              <Link to="/signin" className="navbar-link">
                SIGN OUT
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="navbar-link">
                SIGN UP
              </Link>
              <Link to="/signin" className="navbar-link">
                SIGN IN
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
