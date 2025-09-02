import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`, { position: "bottom-right" });
  };
  const navigate = useNavigate();
  const itemsInCart = food_list.filter((it) => cartItems[it._id] > 0);

  return (
    <div className="p-4 sm:p-8">
      <div className="w-full max-w-full">
        <div className="hidden min-[900px]:block overflow-x-auto">
          <table className="min-w-[900px] w-full bg-white rounded-2xl border border-gray-100">
            <thead>
              <tr className="text-gray-700 text-sm">
                <th className="py-4 px-4 text-left"> </th>
                <th className="py-4 px-4 text-left">Item</th>
                <th className="py-4 px-4 text-left">Description</th>
                <th className="py-4 px-4 text-left">Price</th>
                <th className="py-4 px-4 text-left">Quantity</th>
                <th className="py-4 px-4 text-left">Total</th>
                <th className="py-4 px-4 text-left"> </th>
              </tr>
            </thead>
            <tbody>
              {itemsInCart.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-gray-400 text-lg"
                  >
                    Your cart is empty.
                  </td>
                </tr>
              )}
              {itemsInCart.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-red-100/15 transition group"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center bg-gray-100 rounded-xl w-14 h-14">
                      <img
                        src={url + "/images/" + item.image}
                        alt={item.name}
                        className="w-11 h-11 object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-800">
                    {item.name}
                  </td>
                  <td className="py-4 px-4 text-xs text-gray-700">
                    {item.description || "Fresh & tasty"}
                  </td>
                  <td className="py-4 px-4  ">${item.price}</td>
                  <td className="py-4 px-4">
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-sm inline-block">
                      {cartItems[item._id]}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">
                    ${(item.price * cartItems[item._id]).toFixed(2)}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleRemove(item._id, item.name)}
                      className="text-xs cursor-pointer text-red-500 hover:text-red-700"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block min-[900px]:hidden space-y-4">
          {itemsInCart.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-lg">
              Your cart is empty.
            </div>
          )}
          {itemsInCart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow border border-gray-100 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center bg-gray-100 rounded-xl w-10 h-10">
                  <img
                    src={url + "/images/" + item.image}
                    alt={item.name}
                    className="w-6 h-6 object-cover rounded"
                  />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {item.description || "Fresh & tasty"}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-gray-100 rounded px-2 py-1">
                  Price:{" "}
                  <span className="font-semibold text-[tomato]">
                    ${item.price}
                  </span>
                </span>
                <span className="bg-gray-100 rounded px-2 py-1">
                  Qty:{" "}
                  <span className="font-semibold">{cartItems[item._id]}</span>
                </span>
                <span className="bg-gray-100 rounded px-2 py-1">
                  Total:{" "}
                  <span className="font-semibold">
                    ${(item.price * cartItems[item._id]).toFixed(2)}
                  </span>
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => handleRemove(item._id, item.name)}
                  className="text-xs cursor-pointer text-red-500 hover:text-red-700"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col-reverse lg:flex-row gap-6">
          <section className="flex-1 bg-white p-6 rounded-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalCartAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${getTotalCartAmount() === 0 ? "0.00" : "2.00"}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center">
                <strong>Total</strong>
                <strong>
                  $
                  {(getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + 2
                  ).toFixed(2)}
                </strong>
              </div>
            </div>

            <button
              onClick={() => {
                navigate("/order");
                window.scrollTo(0, 0);
              }}
              disabled={getTotalCartAmount() === 0}
              className="mt-6 w-full sm:w-auto px-5 py-2 bg-[#ff4500] disabled:opacity-50 text-white rounded-md transition-colors"
            >
              Proceed to Checkout
            </button>
          </section>

          <aside className="w-full lg:w-80 bg-white p-6 rounded-md border border-gray-100">
            <p className="text-gray-600">Have a promo code?</p>
            <div className="mt-3 flex gap-2 flex-col md:flex-row">
              <input
                type="text"
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2 border rounded-md outline-none"
              />
              <button className="px-4 py-2 bg-black text-white rounded-md">
                Apply
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Promo codes may not combine. Delivery times vary.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Cart;
