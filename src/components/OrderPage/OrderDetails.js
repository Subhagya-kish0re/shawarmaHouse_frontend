import React from "react";
import FixedNavbar from "../Navbar/Navbar";

const OrderDetails = () => {
  // Retrieve the order details from localStorage and parse it into an object
  const orderDetails = JSON.parse(localStorage.getItem("orderResponse"));

  // Check if orderDetails is not null to avoid errors when accessing properties
  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  return (
    <div>
      <FixedNavbar />
      <div className="App">
        <h1>Thank You .</h1>
        <p>
          {orderDetails.userName}, for ordering, your Order ID is{" "}
          {orderDetails.id}.
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
