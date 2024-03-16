import React, { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MenuList.css"; // Import your custom styles
import FixedNavbar from "../Navbar/Navbar";

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Load items and quantities from local storage on component mount
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setQuantities(storedItems);

    const fetchMenuItems = async () => {
      try {
        const response = await fetch(
          "https://shawarmahousebackend-production.up.railway.app/shawarmahouse/v1/getAllMenuItems"
        );
        const data = await response.json();

        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    // Calculate total amount whenever quantities change
    let total = 0;
    menuItems.forEach((item) => {
      total += item.price * (quantities[item.item_id]?.quantity || 0); // Ensure item_id matches the API response
    });
    setTotalAmount(total);
    localStorage.setItem("totalAmount", total.toString());
  }, [quantities, menuItems]);

  const handleAddToCart = (itemId, itemName) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [itemId]: {
          name: itemName,
          quantity: (prevQuantities[itemId]?.quantity || 0) + 1,
        },
      };

      // Save items and quantities to local storage
      localStorage.setItem("cartItems", JSON.stringify(newQuantities));

      return newQuantities;
    });
  };

  const handleRemoveFromCart = (itemId) => {
    if (quantities[itemId]?.quantity > 0) {
      setQuantities((prevQuantities) => {
        const newQuantities = {
          ...prevQuantities,
          [itemId]: {
            ...prevQuantities[itemId],
            quantity: prevQuantities[itemId].quantity - 1,
          },
        };

        // Save items and quantities to local storage
        localStorage.setItem("cartItems", JSON.stringify(newQuantities));

        return newQuantities;
      });
    }
  };

  return (
    <div className="bg">
      <FixedNavbar />
      <div className="menu-container">
        <h1 className="App">Menu Items</h1>
        <ListGroup className="App">
          {menuItems.map((item) => (
            <ListGroup.Item key={item.item_id} className="menu-item ">
              <strong>{item.name}</strong> - ₹ {item.price}
              <div className="quantity-controls">
                <Button
                  variant="primary"
                  onClick={() => handleRemoveFromCart(item.item_id)} // Use item_id here
                  style={{ marginRight: "5px" }}
                >
                  -
                </Button>
                {quantities[item.item_id]?.quantity || 0}{" "}
                {/* Correctly access the quantity property */}
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(item.item_id, item.name)} // Pass item name here
                  style={{ marginLeft: "5px" }}
                >
                  +
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="App">
          {/* View Cart Button */}
          <Link to="/cart">
            <Button variant="success" style={{ marginTop: "10px" }}>
              View Cart
            </Button>
          </Link>

          {/* Display Total Amount */}
          <div className="total-amount">
            <p>Total Amount: ₹ {totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
