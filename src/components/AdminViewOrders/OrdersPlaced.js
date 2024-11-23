import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://ec2-13-203-79-186.ap-south-1.compute.amazonaws.com:8080/shawarmahouse/v1/status"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch orders initially
    fetchOrders();

    // Set up an interval to fetch orders every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchOrders, 2500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const updateOrderStatus = async (orderId, newStatus) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: newStatus }),
    };

    try {
      const response = await fetch(
        "http://ec2-13-203-79-186.ap-south-1.compute.amazonaws.com:8080/shawarmahouse/v1/updateOrderStatus",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  const removeOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://ec2-13-203-79-186.ap-south-1.compute.amazonaws.com:8080/shawarmahouse/v1/removeOrder/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove order");
      }

      // Assuming the backend returns the updated list of orders after deletion
      const updatedOrders = await response.json();
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error removing order:", error.message);
      // Optionally, handle the error in the UI, e.g., show a notification
    }
  };

  if (isLoading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <AdminNavbar />
      <div className="orders-page">
        <h2>Orders</h2>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
              <th>Order ID</th>
                <th>User Name</th>
                <th>Phone Number</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Items with Quantity</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.userName}</td>
                <td>{order.phoneNumber}</td>
                <td>{new Date(order.orderDate).toLocaleString()}</td>
                <td>{order.status}</td>
                <td>
                  {Object.entries(order.itemsWithQuantity).map(([item, quantity]) => (
                    <div key={item}>
                      {item}: {quantity}
                    </div>
                  ))}
                </td>
                <td>{order.totalAmount}</td>
                <td>
                  <select
                    value={selectedStatus[order.id] || ""}
                    onChange={(e) =>
                      setSelectedStatus({
                        ...selectedStatus,
                        [order.id]: e.target.value,
                      })
                    }
                  >
                      <option value="">Select Status</option>
                      <option value="READY">Ready</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="PAID">Paid</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        updateOrderStatus(order.id, selectedStatus[order.id])
                      }
                    >
                      Update Status
                    </button>
                  </td>
                  <td>
                    {order.status === "PAID" && (
                      <button
                        className="danger"
                        onClick={() => removeOrder(order.id)}
                      >
                        X
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
