import { useState } from "react";
import AiOrderWidget from "./AiOrderWidget";

const Header = ({ orderWidgetOpen, setOrderWidgetOpen }) => {
  return (
    <div className="relative w-full h-[22vw] min-h-[120px] max-h-[300px] mt-2 md:mt-3 mb-7 mx-auto overflow-hidden rounded-[15px]">
      <img
        src="/header_img.png"
        alt="Header background"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
        draggable="false"
      />
      <div className="absolute flex flex-col items-start gap-[1vw] max-w-[45%] bottom-[8%] left-[6vw] header-contents max-[1050px]:max-w-[50%] max-[750px]:max-w-[65%] z-10">
        <h2 className="text-white font-medium md:text-2xl lg:text-4xl xl:text-5xl text-lg leading-tight animate-fade-in-up animation-delay-300 drop-shadow">
          Order your favourite food here
        </h2>
        <p className="text-white text-[10px] lg:text-xs font-medium animate-fade-in-up animation-delay-500 max-[750px]:hidden drop-shadow">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <div className="flex gap-2 mt-5">
          <button
            className="py-1  px-3 md:py-1.5 md:px-4 text-xs md:text-sm font-semibold bg-white  rounded-full animate-fade-in-up animation-delay-700 hover:scale-105 transition-transform cursor-pointer "
            onClick={() => {
              const menuSection = document.getElementById("explore-menu");
              if (menuSection) {
                const y =
                  menuSection.getBoundingClientRect().top + window.scrollY - 60;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          >
            View Menu
          </button>
          <button
            className="py-1 px-3 md:py-1.5 md:px-4 text-xs md:text-sm font-bold bg-[#fff5f0] text-[tomato] rounded-full border border-[tomato] hover:scale-105 transition-all duration-150 flex items-center gap-2 animate-fade-in-up animation-delay-800 focus:outline-none cursor-pointer focus:ring-2 focus:ring-[tomato]"
            onClick={() => setOrderWidgetOpen(true)}
          >
            Order with AI
          </button>
        </div>
      </div>
      <AiOrderWidget
        open={orderWidgetOpen}
        onClose={() => setOrderWidgetOpen(false)}
      />
    </div>
  );
};

export default Header;
