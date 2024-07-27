// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import FixedNavbar from "../Navbar/Navbar";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  localStorage.clear();

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

    // Special condition for Admin login
    if (name === "Admin" && phoneNumber === "9898989898") {
      navigate("/orders"); // Assuming "/orders" is the route for the orders page
      return;
    }

    // Make a POST request with the provided data
    try {
      const response = await fetch(
        "https://shawarmahouse-backend-6ax5.onrender.com/shawarmahouse/v1/createUser",
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
        const data = await response.json();
        const userId = data.user_id;
        localStorage.setItem("username", name);
        localStorage.setItem("userId", userId);
        localStorage.setItem("phoneNumber", phoneNumber);

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
      <div className="background">
        <div className="login-container">
          <h1 className="App">Welcome to Seven Shawarma</h1>
          <br />
          <h3>Please Login Here</h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form
            onSubmit={handleSubmit}
            className="login-form"
            aria-label="Login Form"
          >
            <div className="form-group">
              <label htmlFor="formName">Name</label>
              <input
                className="input-box"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(""); // Clear the error when the name is modified
                }}
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <label htmlFor="formPhoneNumber">Phone Number</label>
              <input
                className="input-box"
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setError(""); // Clear the error when the phone number is modified
                }}
                aria-required="true"
              />
            </div>

            <button className="submit-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
