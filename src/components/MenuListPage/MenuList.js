// src/components/MenuList.js
import React, { useState, useEffect } from "react";
import { ListGroup, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MenuList.css";
import FixedNavbar from "../Navbar/Navbar";

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          "https://shawarmahousebackend-production.up.railway.app/shawarmahouse/v1/getAllMenuItems"
        );
        const data = await response.json();

        // Initialize quantities state with default values
        const initialQuantities = {};
        data.forEach((item) => {
          initialQuantities[item.id] = 0;
        });
        setQuantities(initialQuantities);

        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: prevQuantities[itemId] + 1,
    }));
  };

  const handleRemoveFromCart = (itemId) => {
    if (quantities[itemId] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));
    }
  };

  useEffect(() => {
    // Calculate total amount whenever quantities change
    let total = 0;
    menuItems.forEach((item) => {
      total += item.price * quantities[item.id];
    });
    setTotalAmount(total);
  }, [quantities, menuItems]);

  const handlePlaceOrder = () => {
    // Add your logic for placing the order here
    console.log("Placing order:", quantities);
    // You can make a server request to place the order or perform any other actions
  };

  return (
    <div>
      <FixedNavbar />
      <div className="menu-container">
        <h1>Menu Items</h1>
        <ListGroup>
          {menuItems.map((item) => (
            <ListGroup.Item key={item.id} className="menu-item">
              <strong>{item.name}</strong> - ${item.price}
              <div className="quantity-controls">
                <Button
                  variant="primary"
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={{ marginRight: "5px" }}
                >
                  -1
                </Button>
                {quantities[item.id]} {/* Display the quantity */}
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(item.id)}
                  style={{ marginLeft: "5px" }}
                >
                  +1
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* Order Summary */}
      <Container>
        <div className="order-summary-container">
          <Col>
            <div className="order-summary">
              <h2>Order Summary</h2>
              <p>Total Amount: ${totalAmount}</p>
            </div>
          </Col>
          <Col>
            <Button
              variant="success"
              className="place-order-button"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Col>
        </div>
      </Container>
    </div>
  );
};

export default MenuList;
