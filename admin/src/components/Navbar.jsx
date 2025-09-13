import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-3 px-[4%] bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center gap-4">
        <a href="https://chefai-7d20.onrender.com/" rel="noopener noreferrer">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-[150px] h-[57px] object-cover logo max-[1050px]:w-[140px] max-[900px]:w-[120px] cursor-pointer"
          />
        </a>
        <span className="ml-3 mt-2 text-lg font-bold text-gray-900 tracking-wide select-none">
          Admin Panel
        </span>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={assets.logout_icon}
          alt="Logout"
          className="w-8 h-8 cursor-pointer hover:opacity-80 transition"
          onClick={() =>
            toast.info("This feature is coming soon!", {
              position: "top-center",
              style: {
                borderRadius: "14px",
                minWidth: "200px",
                minHeight: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "1rem",
                background: "#fff",
                color: "#222",
                boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
              },
              icon: false,
              closeOnClick: true,
              pauseOnHover: true,
            })
          }
        />
        <img
          src={assets.profile_image}
          alt="Profile"
          className="w-11 h-11 rounded-full border border-[tomato]"
        />
      </div>
    </nav>
  );
};

export default Navbar;
