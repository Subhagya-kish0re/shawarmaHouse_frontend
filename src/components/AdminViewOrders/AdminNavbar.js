import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
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
        The Shawarma Hub
      </Navbar.Brand>
      <Nav className="mr-auto nav">
        {/* <Nav.Link as={Link} to="/menu">
          Menu
        </Nav.Link>
        <Nav.Link as={Link} to="/login">
          Login
        </Nav.Link> */}
      </Nav>
    </Navbar>
  );
};

export default AdminNavbar;
