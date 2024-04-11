import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from "./Modal.js";
import FixedNavbar from "../Navbar/Navbar";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCoupon] = useState(null);

  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(storedItems);

    // Calculate total amount
    let total = 0;
    Object.values(storedItems).forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  }, []);

  const handleCouponSelect = (couponCode) => {
    if (couponCode === "welcome") {
      if (coupon === "welcome") {
        // If the coupon is already selected, deselect it
        setCoupon(null);
        setTotalAmount(totalAmount * 2); // Remove the 50% discount
      } else {
        // If the coupon is not selected, select it and apply the discount
        setCoupon(couponCode);
        setTotalAmount(totalAmount * 0.5); // Apply 50% discount
      }
      setShowModal(false); // Close the modal
    } else {
      setError("Invalid coupon code.");
    }
  };

  const backToMenu = () => {
    navigate("/menu");
  };

  const handlePlaceOrder = async (e) => {
    // Place order logic here
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in local storage
    const userName = localStorage.getItem("username");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const itemsWithQuantity = Object.entries(cartItems).reduce(
      (acc, [name, { price, quantity }]) => {
        acc[name] = quantity; // Use item name as key
        return acc;
      },
      {}
    );

    const totalAmount = localStorage.getItem("totalAmount");

    const requestBody = {
      userId,
      userName,
      phoneNumber,
      itemsWithQuantity,
      totalAmount,
    };

    try {
      const response = await fetch(
        "https://shawarmahousebackend-production.up.railway.app/shawarmahouse/v1/createOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Order placed successfully:", data);
        // Save the response in localStorage
        localStorage.setItem("orderResponse", JSON.stringify(data));
        // Navigate to OrderPlaced page with order details
        navigate("/orderplaced", { state: { orderDetails: data } });
      } else {
        console.error("Failed to place order:", response.statusText);
        // Set error state to display error message
        setError("Failed to place order: " + response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Set error state to display error message
      setError("Error placing order. Please try again.");
    }
  };

  return (
    <div>
      <FixedNavbar />
      <div className="cart-bg">
        <div className="cart-container">
          <div className="cart-content">
            <h2>Order Summary</h2>

            <div className="cart-items">
              {Object.entries(cartItems).map(([name, { price, quantity }]) => (
                <div key={name} className="cart-item">
                  <h5>
                    {name} x {quantity} - ₹ {price * quantity}
                  </h5>
                </div>
              ))}
            </div>

            {/* Apply Coupons Button */}
            {/* <button onClick={() => setIsModalOpen(true)}>Apply Coupons</button> */}

            {/* Cart Items and Total Amount Display */}
            {/* Your existing cart items and total amount display */}

            {/* Place Order and Back to Menu Buttons */}
            {/* Your existing buttons */}

            {/* Modal for Coupon Selection */}
            <Button variant="primary" onClick={handleShow}>
              Apply Coupons
            </Button>

            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Coupons</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Select Coupons</h4>
                <Form.Check
                  type="radio"
                  label="Welcome"
                  name="coupon"
                  checked={selectedCoupon === "welcome"}
                  onChange={() => handleCouponSelect("welcome")}
                />
                {/* Add more coupons as needed */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="cart-summary">
              <h3>Total Amount: ₹ {totalAmount}</h3>
              <div className="cart-buttons">
                <button className="place-order-btn" onClick={handlePlaceOrder}>
                  Place Order
                </button>
                <button className="back-to-menu-btn" onClick={backToMenu}>
                  Back to Menu
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
