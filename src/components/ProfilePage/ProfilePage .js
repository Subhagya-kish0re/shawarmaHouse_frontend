import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import FixedNavbar from "../Navbar/Navbar";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    tokens: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    fetch(
      `https://shawarmahouse-backend-6ax5.onrender.com/shawarmahouse/v1/findbynumber?number=${phoneNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details. Please try again.");
      });
  }, []);

  const handleNameChange = (e) => {
    setUserDetails((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleSave = () => {
    if (!userDetails.name) {
      setError("Name cannot be empty");
      return;
    }

    // Update user details in the backend
    fetch(
      `https://shawarmahouse-backend-6ax5.onrender.com/shawarmahouse/v1/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userDetails.user_id,
          name: userDetails.name,
          phone: userDetails.phone,
          tokens: userDetails.tokens,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("User details updated:", data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        setError("Error updating user details. Please try again.");
      });
  };

  return (
    <div>
      <FixedNavbar />
      <div className="profile-container">
        <h2>Profile</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="profile-field">
          <label>Name:</label>
          <input
            type="text"
            value={userDetails.name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="profile-field">
          <label>Phone Number:</label>
          <p>{userDetails.phone}</p>
        </div>
        <div className="profile-field">
          <label>Tokens:</label>
          <p>{userDetails.tokens}</p>
        </div>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
