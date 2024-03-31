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
    Object.values(quantities).forEach((item) => {
      if (item.quantity > 0) {
        total += item.price * item.quantity;
      }
    });
    setTotalAmount(total);
    localStorage.setItem("totalAmount", total.toString());
  }, [quantities]);

  const handleAddToCart = (itemName, itemPrice) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [itemName]: {
          price: itemPrice,
          quantity: (prevQuantities[itemName]?.quantity || 0) + 1,
        },
      };

      // Filter out items with quantity 0 before saving to localStorage
      const filteredQuantities = Object.fromEntries(
        Object.entries(newQuantities).filter(
          ([key, value]) => value.quantity > 0
        )
      );

      localStorage.setItem("cartItems", JSON.stringify(filteredQuantities));

      return newQuantities;
    });
  };

  const handleRemoveFromCart = (itemName) => {
    setQuantities((prevQuantities) => {
      if (prevQuantities[itemName]?.quantity > 0) {
        const newQuantities = {
          ...prevQuantities,
          [itemName]: {
            ...prevQuantities[itemName],
            quantity: prevQuantities[itemName].quantity - 1,
          },
        };

        // Filter out items with quantity 0 before saving to localStorage
        const filteredQuantities = Object.fromEntries(
          Object.entries(newQuantities).filter(
            ([key, value]) => value.quantity > 0
          )
        );

        localStorage.setItem("cartItems", JSON.stringify(filteredQuantities));

        return newQuantities;
      }
      return prevQuantities;
    });
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
                  onClick={() => handleRemoveFromCart(item.name)}
                  style={{ marginRight: "5px" }}
                >
                  -
                </Button>
                {quantities[item.name]?.quantity || 0}
                <Button
                  variant="primary"
                  onClick={() => handleAddToCart(item.name, item.price)}
                  style={{ marginLeft: "5px" }}
                >
                  +
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div className="App">
          <Link to="/cart">
            <Button variant="success" style={{ marginTop: "10px" }}>
              View Cart
            </Button>
          </Link>

          <div className="total-amount">
            <h2>Total Amount: ₹ {totalAmount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
