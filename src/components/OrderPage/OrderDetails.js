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
      fetch(`https://shawarmahouse-backend-6ax5.onrender.com/shawarmahouse/v1/gettokens?phoneNumber=${phoneNumber}`)
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
        <p>
          You currently have {tokens} tokens.
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
