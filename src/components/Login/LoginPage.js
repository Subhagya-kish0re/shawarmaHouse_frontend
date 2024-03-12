// src/pages/LoginPage.js
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import FixedNavbar from "../Navbar/Navbar";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for name not null
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    // check for 10 numbers
    if (!/^\d{10}$/.test(phoneNumber)) {
      setError("Phone number must be exactly 10 digits");
      return;
    }

    // Make a POST request with the provided data
    try {
      const response = await fetch(
        "http://localhost:9090/shawarmahouse/v1/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            phoneNumber,
          }),
        }
      );

      if (response.status === 201) {
        // Redirect to the menu page if the response status is created
        navigate("/menu");
      } else {
        // Handle other response statuses
        console.error("Login failed:", response.statusText);
        setError("Login failed: " + response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login. Please try again.");
    }
  };

  return (
    <div>
      <FixedNavbar />
      <div className="login-container">
        <h1 className="App">Login Page</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="input-box"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(""); // Clear the error when the name is modified
              }}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              className="input-box"
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError(""); // Clear the error when the phone number is modified
              }}
            />
          </Form.Group>

          <Button className="submit-button" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
