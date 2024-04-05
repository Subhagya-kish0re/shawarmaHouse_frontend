import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FixedNavbar from "../Navbar/Navbar";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [error, setError] = useState(null); // State to manage error messages
  const navigate = useNavigate();

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
  );
};

export default Cart;
