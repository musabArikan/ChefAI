import { assets } from "../assets/assets";
import { PiBasket } from "react-icons/pi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);
  const { getTotalCartAmount, cartItems, token, setToken } =
    useContext(StoreContext);

  const totalCartCount = Object.values(cartItems).reduce(
    (sum, val) => sum + val,
    0
  );
  const navigate = useNavigate();

  return (
    <nav className="py-2 md:py-5 flex justify-between md:justify-around items-center navbar sticky top-0 z-50 bg-white w-full px-5 md:px-15 ">
      <Link to="/">
        <img
          src={assets.logo}
          alt=""
          className="w-[150px] h-[57px] object-cover logo max-[1050px]:w-[140px] max-[900px]:w-[120px]"
        />
      </Link>
      <ul className="flex gap-5 list-none text-[#49557e] text-lg navbar-menu max-[1050px]:text-[17px] max-[1050px]:gap-5 max-[900px]:text-[16px] max-[900px]:gap-[15px] max-[750px]:hidden">
        <a href="/" onClick={() => setActiveSection("home")}>
          <li
            className={`cursor-pointer py-1 ${
              activeSection === "home" ? "text-[tomato]" : "text-[#49557e]"
            }`}
          >
            Home
            <hr
              className={`border-none outline-none h-0.5 bg-[tomato] w-full m-auto ${
                activeSection === "home" ? "block" : "hidden"
              }`}
            />
          </li>
        </a>
        <a
          href="#explore-menu"
          onClick={() => setActiveSection("explore-menu")}
        >
          <li
            className={`cursor-pointer py-1 ${
              activeSection === "explore-menu"
                ? "text-[tomato]"
                : "text-[#49557e]"
            }`}
          >
            Menu
            <hr
              className={`border-none outline-none h-0.5 bg-[tomato] w-full m-auto ${
                activeSection === "explore-menu" ? "block" : "hidden"
              }`}
            />
          </li>
        </a>
        <a
          href="#app-download"
          onClick={() => setActiveSection("app-download")}
        >
          <li
            className={`cursor-pointer py-1 ${
              activeSection === "app-download"
                ? "text-[tomato]"
                : "text-[#49557e]"
            }`}
          >
            Mobile-App
            <hr
              className={`border-none outline-none h-0.5 bg-[tomato] w-full m-auto ${
                activeSection === "app-download" ? "block" : "hidden"
              }`}
            />
          </li>
        </a>
        <a href="#contact" onClick={() => setActiveSection("contact")}>
          <li
            className={`cursor-pointer py-1 ${
              activeSection === "contact" ? "text-[tomato]" : "text-[#49557e]"
            }`}
          >
            Contact Us
            <hr
              className={`border-none outline-none h-0.5 bg-[tomato] w-full m-auto ${
                activeSection === "contact" ? "block" : "hidden"
              }`}
            />
          </li>
        </a>
      </ul>
      <button
        className="md:ml-4 px-2 py-1 cursor-pointer rounded-full border-2 border-[tomato] text-[tomato] bg-white hover:bg-[tomato]/10 transition text-xs md:text-sm"
        onClick={() => window.open("http://localhost:5174/", "_blank")}
      >
        Admin Panel
      </button>
      <div className="flex items-center gap-10 navbar-right max-[1050px]:gap-[30px] max-[900px]:gap-5">
        {token && (
          <div className="relative">
            <Link to="/cart" onClick={() => window.scrollTo(0, 0)}>
              <PiBasket className="w-8 h-8 text-[tomato]" />
            </Link>
            {totalCartCount > 0 && (
              <div className="absolute min-w-5 min-h-5 bg-[tomato] text-white text-xs font-bold flex items-center justify-center rounded-full top-[-10px] right-[-10px] px-1 shadow">
                {totalCartCount}
              </div>
            )}
          </div>
        )}
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent text-lg text-[#49557e] border border-[tomato] py-[6px] px-[30px] 
        rounded-[50px] cursor-pointer hover:bg-[tomato] hover:text-white transition-all duration-300 max-[1050px]:py-2 max-[1050px]:px-[25px] max-[900px]:py-[7px] max-[900px]:px-5 "
          >
            Sign In
          </button>
        ) : (
          <div className="navbar-profile relative" tabIndex={0}>
            <img
              src={assets.profile_icon}
              alt=""
              className="w-10 h-10 md:w-11 md:h-11 rounded-full shadow-sm border border-[tomato] cursor-pointer"
              onClick={() => setProfileOpen((prev) => !prev)}
            />
            <ul
              className={`navbar-profile-dropdown absolute right-0 z-20 flex-col min-w-[160px] gap-1 bg-white px-4 py-3 rounded-xl border border-[tomato] mt-2 list-none transition-all duration-100 ease-in ${
                profileOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
              style={{ pointerEvents: profileOpen ? "auto" : "none" }}
            >
              <li
                className="flex items-center gap-3 px-3 py-2 hover:text-[tomato] rounded-lg cursor-pointer transition-colors"
                onClick={() => {
                  navigate("/my-orders");
                  setProfileOpen(false);
                }}
              >
                <img src={assets.bag_icon} alt="Orders" className="w-6 h-6" />
                <span className="text-base  font-medium">Orders</span>
              </li>
              <hr className="my-1 border-t border-[tomato]" />
              <li className="flex items-center gap-3 px-3 py-2 hover:text-[tomato] rounded-lg cursor-pointer transition-colors">
                <img
                  src={assets.logout_icon}
                  alt="Logout"
                  className="w-6 h-6"
                />
                <span
                  className="text-base  font-medium"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken("");
                    navigate("/");
                    setProfileOpen(false);
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
