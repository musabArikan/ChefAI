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
    <div className="p-4 sm:p-8 max-[900px]:w-[80%]">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 tracking-tight">
        Food List
      </h2>
      <div className="w-full max-w-full">
        {/* Desktop Table*/}
        <div className="hidden min-[900px]:block overflow-x-auto">
          <table className="min-w-[900px] w-full bg-white rounded-2xl border border-gray-100">
            <thead>
              <tr className="text-gray-700 text-sm">
                <th className="py-4 px-4 text-left"></th>
                <th className="py-4 px-4 text-left">Name</th>
                <th className="py-4 px-4 text-left">Category</th>
                <th className="py-4 px-4 text-left">Price</th>
                <th className="py-4 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-gray-400 text-lg"
                  >
                    No foods found.
                  </td>
                </tr>
              )}
              {list.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-red-100/15 transition group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center bg-gray-100 rounded-xl w-23 h-17">
                      {item.image ? (
                        <img
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : `${url}/images/${item.image}`
                          }
                          alt={item.name}
                          className="w-23 h-17 object-cover rounded-[4px] border border-gray-200"
                        />
                      ) : (
                        <img
                          src={assets.parcel_icon}
                          alt="parcel"
                          className="w-16 h-16 rounded-[4px] border border-gray-200 object-cover"
                        />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-800">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-700">
                    {item.category}
                  </td>
                  <td className="py-4 px-4 text-[tomato] font-bold">
                    ${item.price}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => removeFood(item._id)}
                      className="text-xs text-red-500 hover:text-red-700 font-bold  cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobil Table */}
        <div className="block min-[900px]:hidden space-y-4">
          {list.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-lg">
              No foods found.
            </div>
          )}
          {list.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow border border-gray-100 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 mb-2">
                {item.image ? (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${url}/images/${item.image}`
                    }
                    alt={item.name}
                    className="w-[92px] h-[68px] object-cover rounded-[4px] border border-gray-200"
                  />
                ) : (
                  <img
                    src={assets.parcel_icon}
                    alt="parcel"
                    className="w-[92px] h-[68px] rounded-[4px] border border-gray-200 object-cover"
                  />
                )}
                <div>
                  <div className="font-semibold text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-gray-100 rounded px-2 py-1">
                  Price:{" "}
                  <span className="font-semibold text-[tomato]">
                    ${item.price}
                  </span>
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => removeFood(item._id)}
                  className="text-xs text-red-500 hover:text-red-700 font-bold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
