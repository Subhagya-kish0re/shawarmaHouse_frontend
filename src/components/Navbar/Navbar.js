import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

const FixedNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="title" as={Link} to="/login">
        {/* <img
          src="../assests/5 (1).png" // Update this path to the actual path of your logo
          width="30" // Adjust the width as needed
          height="30" // Adjust the height as needed
          className="d-inline-block align-top" // Bootstrap classes for alignment
          alt="The Shawarma House Logo"
        /> */}
        Seven Shawarma
      </Navbar.Brand>
      <Nav className="mr-auto">
        {/* <Nav.Link as={Link} to="/menu">
          Menu
        </Nav.Link> */}
        {/* <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link> */}
        {/* Add more links as needed */}
      </Nav>
    </Navbar>
  );
};

export default FixedNavbar;
