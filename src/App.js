import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuList from "./components/MenuListPage/MenuList";
import LoginPage from "./components/Login/LoginPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="?" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/menu" element={<MenuList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
