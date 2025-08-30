import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);
  return (
    <div className="w-full m-auto rounded-[15px] border border-[tomato]/30 transition-all  hover:shadow-sm  cursor-pointer">
      <div className="relative">
        <img
          src={url + "/images/" + image}
          alt=""
          className="w-full rounded-t-[15px]"
        />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            alt=""
            onClick={() => addToCart(id)}
            className="w-9 absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%]"
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-2.5 p-1.5 rounded-[50px] bg-white ">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeFromCart(id)}
              className="w-7"
            />
            <p className="font-medium">{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart(id)}
              className="w-7"
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-xl font-medium">{name}</p>
          <img src={assets.rating_starts} alt="" className="w-[70px]" />
        </div>
        <p className="text-gray-700 text-xs">{description}</p>
        <p className="text-[tomato] text-[22px] font-medium my-2.5 mx-0">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
