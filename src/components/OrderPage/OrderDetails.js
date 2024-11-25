import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FixedNavbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderDetails.css"; // Import the CSS file

const OrderDetails = () => {
  const [tokens, setTokens] = useState(0);
  const orderDetails = JSON.parse(localStorage.getItem("orderResponse"));

  useEffect(() => {
    window.scrollTo(0, 0);

    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      fetch(`http://ec2-13-201-203-2.ap-south-1.compute.amazonaws.com:8080/shawarmahouse/v1/gettokens?phoneNumber=${phoneNumber}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched tokens:", data);
          if (typeof data === "number") {
            setTokens(data);
          } else {
            setTokens(data.tokens || 0);
          }
        })
        .catch((error) => {
          console.error("Error fetching tokens:", error);
          setTokens(0);
        });
    }
  }, []);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="home">
      <FixedNavbar />

      <div className="App">
        <Link to="/menu">
          <FontAwesomeIcon icon={faHome} size="2x" />
        </Link>
        <br></br>
        <br></br>
        <h1>Thank You.</h1>
        <p>
          {orderDetails.userName}, for ordering, your Order ID is{" "}
          {orderDetails.id}.
        </p>
        <p>You currently have {tokens} tokens.</p>

        {/* Instagram Button */}
        <button className="uiverse-button instagram-button"
        onClick={() =>
          window.open(
            "https://www.instagram.com/the.shawarma.hub.official?igsh=MXgwNWp6amxoNGgydw==",
            "_blank"
          )
        }>
          <svg viewBox="0 0 16 16" className="bi bi-instagram" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
          </svg>
          <span>Instagram</span>
        </button>

        {/* Google Reviews Button */}
        <button className="uiverse-button google-reviews-button"
        onClick={() =>
          window.open("https://maps.app.goo.gl/h2oJHSqBdauyy4PG7", "_blank")
        }>
          <svg viewBox="0 0 16 16" className="bi bi-google" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C3.588 0 0 3.588 0 8c0 4.411 3.588 8 8 8 4.411 0 8-3.588 8-8 0-.331-.027-.66-.08-.982C15.86 6.334 15.182 6 14.5 6H8v2h4.982c-.205 1.131-.76 2.051-1.656 2.766C11.57 11.695 10.08 12 8.5 12 5.462 12 3 9.538 3 6.5S5.462 1 8.5 1c1.283 0 2.441.498 3.309 1.285l1.809-1.809C12.402.125 10.314 0 8 0z"></path>
          </svg>
          <span>Google Reviews</span>
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
