import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

import { url } from "../assets/assets";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`${url}/api/order/update-status`, {
        orderId,
        status: newStatus,
      });
      if (response.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated");
      } else {
        console.error("Status update failed", response.data);
      }
    } catch (err) {
      console.error("Status update failed", err);
    }
  };
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    const data = response.data;
    if (data.success) {
      setOrders(data.data);
      console.log(data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4 sm:p-8">
      <div className="w-full max-w-full">
        <div className="hidden min-[900px]:block overflow-x-auto">
          <table className="min-w-[900px] w-full bg-white rounded-2xl border border-gray-100">
            <thead>
              <tr className="text-gray-700 text-sm">
                <th className="py-4 px-4 text-left"> </th>
                <th className="py-4 px-4 text-left">User</th>
                <th className="py-4 px-4 text-left">Address</th>
                <th className="py-4 px-4 text-left">Items</th>
                <th className="py-4 px-4 text-left">Amount</th>
                <th className="py-4 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 text-lg"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-red-100/15 transition group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center bg-gray-100 rounded-xl w-10 h-10">
                      <img
                        src={assets.parcel_icon}
                        alt="parcel"
                        className="w-6 h-6"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-800">
                      {order.address?.firstName} {order.address?.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.address?.email}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-700">
                    <div>
                      {order.address?.street}, {order.address?.city}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <ul className="space-y-1">
                      {order.items.map((item) => (
                        <li key={item._id} className="text-xs text-gray-700">
                          {item.name} <span className="text-gray-400">x</span>{" "}
                          <span className="font-semibold">{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-4 text-[tomato] font-bold">
                    ${order.amount}.00
                  </td>
                  <td className="py-4 px-4">
                    <div className="inline-block relative">
                      <select
                        className={`appearance-none border rounded-lg px-3 py-2 pr-8 text-xs font-semibold bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[tomato] transition
                          ${
                            order.status === "Delivered"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : order.status === "On The Way"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for delivery">
                          Out for delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[tomato]">
                        ▼
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block min-[900px]:hidden space-y-4">
          {orders.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-lg">
              No orders found.
            </div>
          )}
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow border border-gray-100 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center bg-gray-100 rounded-xl w-10 h-10">
                  <img
                    src={assets.parcel_icon}
                    alt="parcel"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {order.address?.firstName} {order.address?.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.address?.email}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-700">
                {order.address?.street}, {order.address?.city}
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {order.items.map((item) => (
                  <span
                    key={item._id}
                    className="bg-gray-100 rounded px-2 py-1"
                  >
                    {item.name} <span className="text-gray-400">x</span>{" "}
                    <span className="font-semibold">{item.quantity}</span>
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[tomato] font-bold">
                  ${order.amount}.00
                </span>
                <div className="inline-block relative">
                  <select
                    className={`appearance-none border rounded-lg px-3 py-2 pr-8 text-xs font-semibold bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[tomato] transition
                      ${
                        order.status === "Delivered"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : order.status === "On The Way"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Food Processing">Food Processing</option>
                    <option value="On The Way">On The Way</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[tomato]">
                    ▼
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
