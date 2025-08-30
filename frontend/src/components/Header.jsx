import React from "react";

const Header = () => {
  return (
    <div className="h-[34vw]  mt-2 md:mt-3 mb-7 mx-auto bg-contain relative bg-[url('/header_img.png')] bg-no-repeat header">
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] header-contents max-[1050px]:max-w-[45%] max-[750px]:max-w-[65%]">
        <h2 className="text-white font-medium md:text-3xl lg:text-5xl xl:text-6xl text-xl leading-tight animate-fade-in-up animation-delay-300">
          Order your favourite food here
        </h2>
        <p className="text-white text-xs lg:text-sm font-medium animate-fade-in-up animation-delay-500 max-[750px]:hidden">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button className="bg-white py-4 px-9 border-none font-medium text-gray-500 rounded-[50px] text-sm animate-fade-in-up animation-delay-700 hover:scale-105 transition-transform max-[750px]:py-[2vw] max-[750px]:px-[4vw]">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
