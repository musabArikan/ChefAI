import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  // only items that are in the cart
  const itemsInCart = food_list.filter((it) => cartItems[it._id] > 0);

  return (
    <div className="mt-[50px] px-4 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Your Cart</h1>

      {/* List header for larger screens */}
      <div className="hidden sm:grid grid-cols-6 gap-4 items-center text-gray-500 text-sm border-b border-gray-300 pb-2">
        <div className="col-span-1">Item</div>
        <div className="col-span-2">Title</div>
        <div className="col-span-1">Price</div>
        <div className="col-span-1">Quantity</div>
        <div className="col-span-1">Total</div>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {itemsInCart.length === 0 && (
          <p className="text-gray-600">Your cart is empty.</p>
        )}

        {itemsInCart.map((item) => (
          <article
            key={item._id}
            className="cart-card flex flex-row items-center justify-between gap-3 p-3 sm:grid sm:grid-cols-6 sm:items-center sm:gap-3"
            aria-label={`Cart item ${item.name}`}
          >
            {/* Left: image + title (compact) */}
            <div className="flex items-center gap-3 sm:col-span-3">
              <img
                src={url + "/images/" + item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md flex-shrink-0"
              />
              <div className="flex flex-col">
                <span className="font-medium text-sm line-clamp-2">
                  {item.name}
                </span>
                <span className="text-xs text-gray-500 mt-0.5">
                  {item.description || "Fresh & tasty"}
                </span>
              </div>
            </div>

            {/* Middle: price and qty (small screens inline) */}
            <div className="hidden sm:block sm:col-span-1 text-gray-700 text-sm">
              ${item.price}
            </div>

            <div className="hidden sm:flex sm:col-span-1 items-center justify-center">
              <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {cartItems[item._id]}
              </div>
            </div>

            {/* Right: total + remove (on mobile shown in a compact column) */}
            <div className="flex flex-col items-end gap-1 sm:col-span-1">
              <div className="text-sm font-medium">
                ${(item.price * cartItems[item._id]).toFixed(2)}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-sm text-red-500 hover:text-red-700"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Totals and promos */}
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
  );
};

export default Cart;
