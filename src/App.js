import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuList from "./components/MenuListPage/MenuList";
import LoginPage from "./components/Login/LoginPage";
import Cart from "./components/Cart/Cart";
import OrderDetails from "./components/OrderPage/OrderDetails";
import OrdersPage from "./components/AdminViewOrders/OrdersPlaced";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="?" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/menu" element={<MenuList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orderplaced" element={<OrderDetails />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
