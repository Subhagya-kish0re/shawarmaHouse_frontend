import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FixedNavbar from "../Navbar/Navbar";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [error, setError] = useState(null); // State to manage error messages
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Retrieve cart items from local storage
  //   const storedItems = JSON.parse(localStorage.getItem("cartItems")) || {};
  //   setCartItems(
  //     Object.entries(storedItems).map(([itemId, { name, quantity }]) => ({
  //       itemId,
  //       name,
  //       quantity,
  //     }))
  //   );
  // }, []);

  // useEffect(() => {
  //   // Calculate total amount
  //   const storedItems = JSON.parse(localStorage.getItem("cartItems")) || {};
  //   setCartItems(
  //     Object.entries(storedItems).map(([itemId, { name, quantity }]) => ({
  //       itemId,
  //       name,
  //       quantity,
  //     }))
  //   );

  //   // Retrieve total amount from local storage
  //   const storedTotalAmount = localStorage.getItem("totalAmount");
  //   if (storedTotalAmount) {
  //     setTotalAmount(parseFloat(storedTotalAmount));
  //   }
  // }, []);
  // const backToMenu = () => {
  //   navigate("/menu");
  // };

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
    <div className="bg App">
      <FixedNavbar />

      <div className="main">
        <h2>Order Summary</h2>
        {/* <ListGroup>
          {cartItems
            .filter((item) => item.quantity > 0)
            .map(({ itemId, name, quantity }) => (
              <ListGroup.Item key={itemId} className="cart-item">
                
                <h5>
                  {name} {quantity}
                </h5>
              </ListGroup.Item>
            ))}
        </ListGroup> */}

        <ListGroup>
          {Object.entries(cartItems).map(([name, { price, quantity }]) => (
            <ListGroup.Item key={name} className="cart-item">
              <h5>
                {name} x {quantity} - ₹ {price * quantity}
              </h5>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <br />
        <br></br>
        <div>
          <div cl>
            <h3>Total Amount: ₹ {totalAmount}</h3>
          </div>
          <div className="flex">
            <Button variant="danger" onClick={handlePlaceOrder}>
              Place Order
            </Button>
            <Button
              className="menu-button"
              variant="secondary"
              onClick={backToMenu}
            >
              Back to Menu
            </Button>
          </div>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
