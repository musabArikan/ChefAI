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
      setOrders([...data.data].reverse());
      console.log(data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4 sm:p-8 max-[900px]:w-[80%]">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 tracking-tight">
        Order Management
      </h2>
      <div className="w-full max-w-full">
        <div className="hidden min-[900px]:block overflow-x-auto">
          <table className="min-w-[900px] w-full bg-white rounded-2xl border border-gray-100">
            <thead>
              <tr className="text-gray-700 text-sm">
                <th className="py-4 px-4 text-left"> </th>
                <th className="py-4 px-4 text-left">User</th>
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
                <>
                  <tr
                    key={order._id}
                    className="border-b  border-gray-100 last:border-b-0 hover:bg-red-100/15 transition group"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center bg-gray-100 rounded-xl w-14 h-14">
                        {order.items &&
                        order.items[0] &&
                        order.items[0].image ? (
                          <img
                            src={
                              order.items[0].image.startsWith("http")
                                ? order.items[0].image
                                : `${url}/images/${order.items[0].image}`
                            }
                            alt={order.items[0].name}
                            className="w-11 h-11 object-cover rounded"
                          />
                        ) : (
                          <img
                            src={assets.parcel_icon}
                            alt="parcel"
                            className="w-6 h-6"
                          />
                        )}
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
                    <td className="py-4 px-4">
                      <ul className="space-y-1">
                        {order.items.map((item) => (
                          <li key={item._id} className="text-xs text-gray-700">
                            <span className="font-semibold">
                              {item.quantity}
                            </span>{" "}
                            <span className="text-gray-400">x</span> {item.name}
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
                          <option value="Food Processing">
                            Food Processing
                          </option>
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
                  <tr>
                    <td
                      colSpan={5}
                      className="py-2 px-4 text-xs text-gray-700 bg-orange-50"
                    >
                      <span className="font-semibold text-gray-800">
                        Address:
                      </span>{" "}
                      {order.address?.street}, {order.address?.city},{" "}
                      {order.address?.district}, {order.address?.country}{" "}
                      {order.address?.zipCode}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobil Admin Orders */}
        <div className="block min-[900px]:hidden space-y-4">
          {orders.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-lg">
              No orders found.
            </div>
          )}
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow border border-gray-100 p-2 flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center justify-center bg-gray-100 rounded-xl w-9 h-9">
                  {order.items && order.items[0] && order.items[0].image ? (
                    <img
                      src={
                        order.items[0].image.startsWith("http")
                          ? order.items[0].image
                          : `${url}/images/${order.items[0].image}`
                      }
                      alt={order.items[0].name}
                      className="w-7 h-7 object-cover rounded"
                    />
                  ) : (
                    <img
                      src={assets.parcel_icon}
                      alt="parcel"
                      className="w-5 h-5"
                    />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    {order.address?.firstName} {order.address?.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.address?.email}
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-700 bg-orange-50 rounded px-1 py-1">
                <span className="font-semibold text-gray-800">Address:</span>{" "}
                {order.address?.street}, {order.address?.city},{" "}
                {order.address?.district}, {order.address?.country}{" "}
                {order.address?.zipCode}
              </div>
              <div className="flex flex-wrap gap-1 text-xs">
                {order.items.map((item) => (
                  <span
                    key={item._id}
                    className="bg-gray-100 rounded px-1 py-0.5"
                  >
                    <span className="font-semibold">{item.quantity}</span>{" "}
                    <span className="text-gray-400">x</span> {item.name}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[tomato] font-bold text-sm">
                  ${order.amount}.00
                </span>
                <div className="inline-block relative">
                  <select
                    className={`appearance-none border rounded-lg px-2 py-1 pr-6 text-xs font-semibold bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[tomato] transition
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
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[tomato] text-xs">
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
