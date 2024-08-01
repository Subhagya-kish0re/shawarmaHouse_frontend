import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faSignOutAlt, faUser, faUtensils } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

const FixedNavbar = () => {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      navigate(`/order-history?phoneNumber=${phoneNumber}`);
    }
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/login">
        The Shawarma Hub
      </Link>
      <div className="nav-icons">
        <FontAwesomeIcon icon={faHistory} size="2x" className="nav-icon" onClick={handleHistoryClick} />
        <Link to="/menu">
          <FontAwesomeIcon icon={faUtensils} size="2x" className="nav-icon" />
        </Link>
        <Link className="nav-link" to="/profile">
          <FontAwesomeIcon icon={faUser} size="2x" className="nav-icon" />
        </Link>
        <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="nav-icon" onClick={handleLogoutClick} />
      </div>
    </nav>
  );
};

export default FixedNavbar;
