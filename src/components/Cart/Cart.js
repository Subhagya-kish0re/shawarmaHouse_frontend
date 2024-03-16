import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FixedNavbar from "../Navbar/Navbar";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(
      Object.entries(storedItems).map(([itemId, { name, quantity }]) => ({
        itemId,
        name,
        quantity,
      }))
    );
  }, []);

  useEffect(() => {
    // Calculate total amount
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(
      Object.entries(storedItems).map(([itemId, { name, quantity }]) => ({
        itemId,
        name,
        quantity,
      }))
    );

    // Retrieve total amount from local storage
    const storedTotalAmount = localStorage.getItem("totalAmount");
    if (storedTotalAmount) {
      setTotalAmount(parseFloat(storedTotalAmount));
    }
  }, []);

  const handlePlaceOrder = () => {
    // Place order logic here
    console.log("Order placed");
  };

  return (
    <div className="bg App">
      <FixedNavbar />

      <div className="main">
        <h2>Order Summary</h2>
        <ListGroup>
          {cartItems.map(({ itemId, name, quantity }) => (
            <ListGroup.Item key={itemId} className="cart-item">
              {name} {quantity}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <br />
        <br></br>
        <div>
          <div cl>
            <h3>Total Amount: ₹ {totalAmount}</h3>
          </div>
          <Button variant="danger" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
