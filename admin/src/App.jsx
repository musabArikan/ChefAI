import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const App = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/orders?from=home", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
