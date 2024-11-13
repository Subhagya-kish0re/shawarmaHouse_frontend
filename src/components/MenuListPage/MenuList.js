import React, { useState, useEffect } from "react";
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
          "https://shawarmahouse-backend-6ax5.onrender.com/shawarmahouse/v1/getAllMenuItems"
        );
        const data = await response.json();

        // Define the specific order for categories
        const categoryOrder = ["Shawarma", "Mocktail", "Sandwich", "Meal"];

        // Custom sorting function
        const sortByCategoryOrder = (a, b) => {
          const indexA = categoryOrder.indexOf(a.category);
          const indexB = categoryOrder.indexOf(b.category);
          if (indexA === -1) return 1; // If category not found, sort it to the end
          if (indexB === -1) return -1; // If category not found, sort it to the end
          return indexA - indexB;
        };

        // Sort and set menu items
        const sortedMenuItems = data.sort(sortByCategoryOrder);
        setMenuItems(sortedMenuItems);
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

  // Function to group items by category
  const categorizeItems = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []; // Initialize an empty array for new categories
      }
      acc[item.category].push(item );
      return acc;
    }, {});
  };

  const categorizedItems = categorizeItems(menuItems);

  return (
    <div>
      <FixedNavbar />

      <div className="bg">
        <h1 className="App">Menu Items</h1>
        <div className="menu-container">
          {Object.keys(categorizedItems).map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              {categorizedItems[category].map((item) => (
                <div key={item.item_id} className="menu-item">
                  <div>
                    <strong>{item.name}</strong> - ₹ {item.price}
                    <p>{item.description}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => handleRemoveFromCart(item.name)} style={{ marginRight: "5px" }}>
                      -
                    </button>
                    {quantities[item.name]?.quantity || 0}
                    <button onClick={() => handleAddToCart(item.name, item.price)} style={{ marginLeft: "5px" }}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="App">
          <Link to="/cart">
            <button className="view-cart-button" style={{ backgroundColor: "var(--theme-dark-gray)", color: "var(--theme-black)" }}>
              View Cart
            </button>
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