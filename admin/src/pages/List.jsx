import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { url } from "../assets/assets";
const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-gray-500 text-base flex flex-col gap-5">
      <p>All Foods List</p>
      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center py-3 px-4 gap-2.5 border-b border-[#cacaca] text-[13px] bg-[#f9f9f9] max-[600px]:hidden">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* Table Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center py-3 px-4 gap-2.5 border-b border-[#cacaca] text-[13px] max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-4"
          >
            <img
              src={`${url}/images/` + item.image}
              alt={item.name}
              className="w-[50px]"
            />
            <p>{item.name}</p>
            <p className="max-[600px]:hidden">{item.category}</p>
            <p className="max-[600px]:hidden">${item.price}</p>
            <p
              onClick={() => removeFood(item._id)}
              className="cursor-pointer text-red-500 font-bold"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
