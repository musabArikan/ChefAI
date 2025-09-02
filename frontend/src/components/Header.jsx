import React from "react";

const Header = () => {
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
        <button
          className="bg-white py-2 px-6 border-none font-medium text-gray-500 rounded-[50px] text-xs animate-fade-in-up animation-delay-700 hover:scale-105 transition-transform max-[750px]:py-[1vw] max-[750px]:px-[2vw]"
          onClick={() => {
            const menuSection = document.getElementById("explore-menu");
            if (menuSection) {
              menuSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
