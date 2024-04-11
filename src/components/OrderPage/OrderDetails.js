import React, { useEffect } from "react";
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
      {/* <ParticlesEffect /> */}
      <RingsEffect>
        <div className="App">
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
