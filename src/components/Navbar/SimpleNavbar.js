import React from 'react';
import { Link } from "react-router-dom";


const SimpleNavbar = () => {
  return (
    <div>
      <nav className="navbar">
      <Link className="navbar-brand" to="/login">
        The Shawarma Hub
      </Link>
      
    </nav>
    </div>
  )
}

export default SimpleNavbar;
