import React, { useState, useEffect } from "react";
import FixedNavbar from "../Navbar/Navbar";
import "../ProfilePage/ProfilePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        phone: "",
        tokens: 0,
      });
      const [error, setError] = useState(null);
      const [successMessage, setSuccessMessage] = useState("");
    
      useEffect(() => {
        const phoneNumber = localStorage.getItem("phoneNumber");
        if (phoneNumber) {
          fetch(`http://ec2-13-201-203-2.ap-south-1.compute.amazonaws.com:8080/shawarmahouse/v1/findbynumber?number=${phoneNumber}`)
            .then((response) => response.json())
            .then((data) => {
              setUserDetails({
                name: data.name,
                phone: data.phone,
                tokens: data.tokens,
              });
            })
            .catch((error) => {
              console.error("Error fetching user details:", error);
              setError("Error fetching user details.");
            });
        }
      }, []);
    
      const handleNameChange = (e) => {
        setUserDetails({ ...userDetails, name: e.target.value });
      };
    
      const handleSave = () => {
        const { name, phone } = userDetails;
    
        fetch(`http://ec2-13-203-79-186.ap-south-1.compute.amazonaws.com:8080/shawarmahouse/v1/updateName?username=${name}&phoneNumber=${phone}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log("Name updated successfully");
              setSuccessMessage("Name changed successfully!");
              setTimeout(() => {
                setSuccessMessage("");
              }, 3000); // Hide the message after 3 seconds
            } else {
              throw new Error("Failed to update name");
            }
          })
          .catch((error) => {
            console.error("Error updating name:", error);
            setError("Error updating name. Please try again.");
          });
      };
  return (
    <div>
      <FixedNavbar />
      <div className="profile-container">
        <h2>Profile</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
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
