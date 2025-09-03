import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-[4%] ">
      <div
        className="flex 
      items-center"
      >
        <img
          src={assets.logo}
          alt="Logo"
          className="w-[150px] h-[57px] object-cover logo max-[1050px]:w-[140px] max-[900px]:w-[120px]"
        />
        <p className="text-xs text-[tomato] border px-2 py-1 border-[tomato] rounded-full ">
          Admin Panel
        </p>
      </div>
      <img
        src={assets.profile_image}
        alt=""
        className=" w-12 h-12 rounded-full  shadow-sm border border-[tomato] "
      />
    </nav>
  );
};

export default Navbar;
