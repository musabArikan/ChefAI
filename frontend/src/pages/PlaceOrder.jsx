import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "Musab",
    lastName: "Arıkan",
    email: "arikan950@hotmail.com",
    street: "Adnan Kahveci Neighborhood Armutlu Street",
    city: "İstanbul",
    state: "Marmara",
    zipcode: "34760",
    country: "Turkey",
    phone: "+90 543 967 97 12",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    try {
      await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      toast.success("Your order has been received!", {
        position: "bottom-right",
      });
      setCartItems({});
      setTimeout(() => {
        window.scrollTo(0, 0);
        navigate("/my-orders");
      }, 1000);
    } catch (err) {
      toast.error("Order could not be placed!", { position: "top-right" });
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate]);
  return (
    <>
      <ToastContainer />
      <form
        onSubmit={placeOrder}
        className="flex items-start flex-col md:flex-row justify-between gap-[50px] mt-[50px]"
      >
        <div className="w-full max-w-[max(30%,500px)]">
          <p className="text-3xl font-semibold mb-[50px]">
            Delivery Information
          </p>
          <div className="flex gap-2.5">
            <input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
              placeholder="First name"
              required
              className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
            />
            <input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              placeholder="Last name"
              required
              className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
            />
          </div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Email address"
            required
            className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
          />
          <input
            type="text"
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            placeholder="Street"
            required
            className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
          />
          <div className="flex gap-2.5">
            <input
              type="text"
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              placeholder="City"
              required
              className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
            />
            <input
              type="text"
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              placeholder="State"
              required
              className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
            />
          </div>
          <div className="flex gap-2.5">
            <input
              type="text"
              name="zipcode"
              value={data.zipcode}
              onChange={onChangeHandler}
              placeholder="Zip code"
              required
              className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
            />
            <input
              type="text"
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              placeholder="Country"
              required
              className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
            />
          </div>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            placeholder="Phone"
            required
            className="mb-[15px] w-full p-2.5 border border-gray-300 rounded outline-[tomato]"
          />
        </div>
        <div className="w-full max-w-[max(40%,500px)]">
          <div>
            <h2 className="text-2xl font-bold mb-2">Cart Totals</h2>
            <div>
              <div className="flex justify-between text-gray-600">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr className="my-2.5 border-gray-200" />
              <div className="flex justify-between text-gray-600">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr className="my-2.5 border-gray-200" />
              <div className="flex justify-between text-gray-600">
                <b>Total</b>
                <b>
                  ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            <button
              type="submit"
              className="mt-[30px] border-none text-yellow-100 bg-[tomato] w-[max(15vw,200px)] py-3 rounded cursor-pointer hover:bg-[#ff4500] transition-colors"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
