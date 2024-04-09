import React from "react";
import FixedNavbar from "../Navbar/Navbar";
import ParticlesEffect from "./ParticlesEffect";
import FogComponent from "../Animations/FogComponent";

const OrderDetails = () => {
  const orderDetails = JSON.parse(localStorage.getItem("orderResponse"));

  if (!orderDetails) {
    return <div>Loading order details...</div>;
  }

  return (
    <div>
      <FixedNavbar />
      <FogComponent>
        {/* <ParticlesEffect /> */}
        <div className="App">
          <h1>Thank You.</h1>
          <p>
            {orderDetails.userName}, for ordering, your Order ID is{" "}
            {orderDetails.id}.
          </p>
        </div>
      </FogComponent>
    </div>
  );
};

export default OrderDetails;
