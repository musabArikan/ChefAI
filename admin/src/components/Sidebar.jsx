import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-[1.5px] border-gray-400 border-t-0 text-[max(1vw,10px)]">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-5">
        <NavLink
          to={"/add"}
          className="flex items-center gap-3 border border-gray-400 border-r-0 py-2 px-2.5 rounded-l cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <img src={assets.add_icon} alt="" className="w-5 h-5" />
          <p className="max-[900px]:hidden">Add Food</p>
        </NavLink>
        <NavLink
          to={"/list"}
          className="flex items-center gap-3 border border-gray-400 border-r-0 py-2 px-2.5 rounded-l cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="max-[900px]:hidden">Food List</p>
        </NavLink>
        <NavLink
          to={"/orders"}
          className="flex items-center gap-3 border border-gray-400 border-r-0 py-2 px-2.5 rounded-l cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <img src={assets.order_icon} alt="" className="w-5 h-5" />
          <p className="max-[900px]:hidden">Order Management</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
