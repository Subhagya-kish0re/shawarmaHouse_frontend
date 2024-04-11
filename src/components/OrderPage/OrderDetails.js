import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import FixedNavbar from "../Navbar/Navbar";
import RingsEffect from "../Animations/RingComponent";

const OrderDetails = () => {
  const orderDetails = JSON.parse(localStorage.getItem("orderResponse"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  return (
    <div>
      <FixedNavbar />
      <RingsEffect>
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
        </div>
      </RingsEffect>
    </div>
  );
};

export default OrderDetails;
