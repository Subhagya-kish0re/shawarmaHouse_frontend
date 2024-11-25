import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import SimpleNavbar from "../Navbar/SimpleNavbar";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    // Special condition for Admin login
    if (name === "Admin" && phoneNumber === "9898989898") {
      navigate("/orders");
      return;
    }

    try {
      const response = await fetch(
        "http://ec2-13-201-203-2.ap-south-1.compute.amazonaws.com:8080/shawarmahouse/v1/createUser",
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

        navigate("/menu");
      } else {
        console.error("Login failed:", response.statusText);
        setError("Login failed: " + response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SimpleNavbar />
      <div className="background">
        <div className="login-container">
          <h1 className="App">Welcome to<br></br> The Shawarma Hub</h1>
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
                  setError(""); 
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
                  setError(""); 
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

      {isLoading && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Please wait a moment...</h2>
            <div className="loader">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
              <div className="bar4"></div>
              <div className="bar5"></div>
              <div className="bar6"></div>
              <div className="bar7"></div>
              <div className="bar8"></div>
              <div className="bar9"></div>
              <div className="bar10"></div>
              <div className="bar11"></div>
              <div className="bar12"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default LoginPage;
