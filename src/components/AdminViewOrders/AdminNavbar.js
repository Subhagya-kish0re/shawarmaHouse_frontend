import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand className="title" as={Link} to="/login">
        The Shawarma Hub
      </Navbar.Brand>
      <Nav className="mr-auto nav"></Nav>
    </Navbar>
  );
};

export default AdminNavbar;
