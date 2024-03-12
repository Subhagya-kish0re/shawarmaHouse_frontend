import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

const FixedNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="title" as={Link} to="/login">
        The Shawarma House
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
