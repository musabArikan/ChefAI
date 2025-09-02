import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [activeSection, setActiveSection] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="py-2 md:py-5 flex justify-between md:justify-around items-center navbar sticky top-0 z-50 bg-white w-full px-15 ">
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
      <div className="flex items-center gap-10 navbar-right max-[1050px]:gap-[30px] max-[900px]:gap-5">
        {token && (
          <div className="relative">
            <Link to="/cart" onClick={() => window.scrollTo(0, 0)}>
              <img src={assets.basket_icon} alt="" className="w-7 h-7 " />
            </Link>
            <div className="absolute min-w-2.5 min-h-2.5 bg-[tomato] rounded-md top-[-8px] right-[-8px]"></div>
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
          <div className="navbar-profile relative group" tabIndex={0}>
            <img
              src={assets.profile_icon}
              alt=""
              className="w-10 h-10 md:w-11 md:h-11 rounded-full  shadow-sm border border-[tomato] "
            />
            <ul
              className="navbar-profile-dropdown absolute right-0 z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 flex-col min-w-[160px] gap-1 bg-white px-4 py-3 rounded-xl border border-[tomato] mt-2 list-none transition-all duration-100 ease-in"
              style={{ pointerEvents: "auto" }}
            >
              <li
                className="flex items-center gap-3 px-3 py-2 hover:text-[tomato] rounded-lg cursor-pointer transition-colors"
                onClick={() => navigate("/my-orders")}
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
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
