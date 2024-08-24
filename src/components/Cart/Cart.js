import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FixedNavbar from "../Navbar/Navbar";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [useTokens, setUseTokens] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(storedItems);

    let total = 0;
    Object.values(storedItems).forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);

    const phoneNumber = localStorage.getItem("phoneNumber");
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
  }, []);

  const handleUseTokensChange = () => {
    setUseTokens((prevUseTokens) => {
      if (!prevUseTokens) {
        setTotalAmount((prevTotal) => {
          const newTotal = Math.max(0, prevTotal - tokens);
          return newTotal;
        });
      } else {
        setTotalAmount((prevTotal) => prevTotal + tokens);
      }
      return !prevUseTokens;
    });
  };

  const backToMenu = () => {
    navigate("/menu");
  };

  const handlePlaceOrder = async (e) => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("username");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const itemsWithQuantity = Object.entries(cartItems).reduce(
      (acc, [name, { price, quantity }]) => {
        acc[name] = quantity;
        return acc;
      },
      {}
    );

    let finalAmount = totalAmount;
    let newTokens = tokens;

    if (useTokens && tokens > 0) {
      if (tokens >= totalAmount) {
        finalAmount = 0;
        newTokens = tokens - totalAmount; // Subtract totalAmount from tokens
      } else {
        finalAmount = totalAmount - tokens;
        newTokens = 0; // All tokens are used
      }
    } else {
      // If tokens are not used or insufficient to cover the total amount, earn new tokens
      newTokens = tokens + finalAmount * 0.1;
    }

    const updateTokenURL = `https://shawarmahouse-backend-6ax5.onrender.com/shawarmahouse/v1/update?phoneNumber=${phoneNumber}&token=${newTokens}`;

    try {
      const updateResponse = await fetch(updateTokenURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!updateResponse.ok) {
        console.error("Failed to update tokens:", updateResponse.statusText);
        setError("Failed to update tokens: " + updateResponse.statusText);
        return;
      } else {
        console.log("Tokens updated successfully");
      }
    } catch (updateError) {
      console.error("Error updating tokens:", updateError);
      setError("Error updating tokens. Please try again.");
      return;
    }

    const requestBody = {
      userId,
      userName,
      phoneNumber,
      itemsWithQuantity,
      totalAmount: finalAmount,
      tokens: newTokens,
    };

    try {
      const response = await fetch(
        "https://shawarmahouse-backend-6ax5.onrender.com/shawarmahouse/v1/createOrder",
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
        localStorage.setItem("orderResponse", JSON.stringify(data));
        navigate("/orderplaced", { state: { orderDetails: data } });
      } else {
        console.error("Failed to place order:", response.statusText);
        setError("Failed to place order: " + response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
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

            <div className="cart-summary">
              <h3>Total Amount: ₹ {totalAmount}</h3>
              <h4>Available Tokens: {tokens}</h4>
              <Form.Check
                type="checkbox"
                label="Use Tokens"
                checked={useTokens}
                onChange={handleUseTokensChange}
                disabled={tokens === 0}
              />
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
