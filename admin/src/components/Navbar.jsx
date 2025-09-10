import { assets } from "../assets/assets";

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
        <span className="ml-3 mt-3 text-lg font-bold text-gray-700 tracking-wide select-none">
          <span className="text-[tomato]">Admin</span> Panel
        </span>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={assets.profile_image}
          alt="Profile"
          className="w-11 h-11 rounded-full border border-gray-200 shadow"
        />
      </div>
    </nav>
  );
};

export default Navbar;
