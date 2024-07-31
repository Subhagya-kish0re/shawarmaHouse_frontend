import React from "react";
import { Link } from "react-router-dom";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Navbar.css";

const FixedNavbar = () => {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/login">
        The Shawarma Hub
      </Link>
      <div className="nav-links">
      <Link className="nav-link" to="/menu">
          <FontAwesomeIcon icon={faBars} size="lg" />
        </Link>
        <Link className="nav-link" to="/profile">
          <FontAwesomeIcon icon={faUser} size="lg" />
        </Link>
      </div>
    </nav>
  );
};

export default FixedNavbar;
