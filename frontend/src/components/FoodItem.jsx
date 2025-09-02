import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  const handleAdd = () => {
    addToCart(id);
    toast.success(`${name} added to cart`, { position: "bottom-right" });
  };
  const handleRemove = () => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`, { position: "bottom-right" });
  };
  return (
    <div className="w-full m-auto rounded-[15px] border border-[tomato]/50 transition-all  hover:shadow-sm  cursor-pointer">
      <div className="relative">
        <img
          src={url + "/images/" + image}
          alt=""
          className="w-full rounded-t-[15px]"
        />
        {!cartItems[id] ? (
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 absolute bottom-[15px] right-[15px] cursor-pointer rounded-full bg-white  text-[tomato] font-semibold text-xs"
            aria-label="Add to cart"
          >
            <span>Add to Cart</span>
            <FaPlusCircle size={18} color="tomato" />
          </button>
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-2.5 p-1.5 rounded-[50px] bg-white ">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-transparent border-none p-0 flex items-center"
              aria-label="Remove from cart"
            >
              <FaMinusCircle size={20} color="#ef4444" />
            </button>
            <p className="font-medium">{cartItems[id]}</p>
            <button
              type="button"
              onClick={handleAdd}
              className="bg-transparent border-none p-0 flex items-center"
              aria-label="Add more"
            >
              <FaPlusCircle size={20} color="#22c55e" />
            </button>
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
