import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-2 px-[4%]">
      <img src={assets.logo} alt="Logo" className="w-[max(10%,80px)]" />
      <img
        src={assets.profile_image}
        alt=""
        className=" w-12 h-12 rounded-full  shadow-sm border border-[tomato] "
      />
    </nav>
  );
};

export default Navbar;
