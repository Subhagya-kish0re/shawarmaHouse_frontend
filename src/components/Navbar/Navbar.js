import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const FixedNavbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/login">
        The Shawarma Hub
      </Link>
      <div className="nav-links">
        {/* Uncomment and adjust the links as needed */}
        {/* <Link className="nav-link" to="/menu">Menu</Link> */}
        {/* <Link className="nav-link" to="/login">Login</Link> */}
        {/* Add more links as needed */}
      </div>
    </nav>
  );
};

export default FixedNavbar;
