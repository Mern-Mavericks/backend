import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MERN Skeleton
        </Link>
        <div className="navbar-links">
          <Link to="/users" className="navbar-link">USERS</Link>
          <Link to="/signup" className="navbar-link">SIGN UP</Link>
          <Link to="/signin" className="navbar-link">SIGN IN</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
