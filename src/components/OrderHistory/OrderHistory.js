import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FixedNavbar from "../Navbar/Navbar";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const location = useLocation();
  const phoneNumber = new URLSearchParams(location.search).get("phoneNumber");

  useEffect(() => {
    if (phoneNumber) {
      fetch(`http://ec2-13-203-79-186.ap-south-1.compute.amazonaws.com:8080/shawarmahouse/v1/byphonenumber/${phoneNumber}`)
        .then((response) => response.json())
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.error("Error fetching order history:", error);
        });
    }
  }, [phoneNumber]);

  return (
    <div>
      <FixedNavbar />
      <div className="order-history-container">
        <h2>Order History</h2>
        {orders.length > 0 ? (
          orders
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .map((order) => (
              <div key={order.id} className="order-item">
                <h3>Order ID: {order.id}</h3>
                <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
                <p>Status: {order.status}</p>
                <p>Total Amount: ₹ {order.totalAmount}</p>
                <div className="order-items">
                  {Object.entries(order.itemsWithQuantity).map(([item, quantity]) => (
                    <p key={item}>{item}: {quantity}</p>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <p>No order history available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
