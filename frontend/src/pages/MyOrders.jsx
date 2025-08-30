import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { assets } from "../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/user-orders`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    setData(response.data.data);
    console.log(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders mt-12 mb-12">
      <h2 className="text-2xl font-bold mb-10 text-center text-gray-800 tracking-tight">
        My Orders
      </h2>
      <div className="container flex flex-col gap-7 mt-8">
        {data.length === 0 && (
          <div className="text-center text-gray-400 text-lg">
            No orders found.
          </div>
        )}
        {data.map((order, index) => (
          <div
            key={index}
            className="bg-white/80 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 px-6 py-5 flex flex-col md:flex-row md:items-center md:gap-8 gap-4"
          >
            <div className="flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-xl w-16 h-16">
              <img src={assets.parcel_icon} alt="" className="w-10 h-10" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {order.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    {item.name} x {item.quantity}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-6 mt-2 text-sm">
                <span className="text-gray-500">
                  Amount:{" "}
                  <span className="text-[tomato] font-semibold">
                    ${order.amount}.00
                  </span>
                </span>
                <span className="text-gray-500">
                  Items:{" "}
                  <span className="text-[tomato] font-semibold">
                    {order.items.length}
                  </span>
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    order.status === "delivered"
                      ? "bg-green-50 text-[tomato]"
                      : order.status === "pending"
                      ? "bg-yellow-50 text-[tomato]"
                      : "bg-gray-100 text-[tomato]"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      order.status === "delivered"
                        ? "bg-[tomato]"
                        : order.status === "pending"
                        ? "bg-[tomato]"
                        : "bg-[tomato]"
                    }`}
                  ></span>
                  {order.status}
                </span>
              </div>
            </div>
            <div className="flex md:flex-col flex-row gap-2 md:ml-0 ml-auto">
              <button
                onClick={fetchOrders}
                className="py-2 px-5 rounded-lg bg-[tomato]/10 text-[tomato] font-semibold hover:bg-[tomato]/20 transition text-sm border border-[tomato]"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyOrders;
