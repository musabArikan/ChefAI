import assistantIcon from "../assets/assistant_icon.png";
import { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const AiOrderWidget = ({ open, onClose }) => {
  const { food_list, addToCart, url } = useContext(StoreContext);
  const [input, setInput] = useState("Can you suggest me a Turkish main dish?");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const menuWithDescriptions = food_list.map((f) => ({
    name: f.name,
    description: f.description || "No Desc.",
  }));

  const askAi = async (prompt, exclude = "") => {
    setLoading(true);
    setError("");
    setSuggestion("");
    try {
      const res = await axios.post(`${url}/api/ai/suggest`, {
        prompt,
        menu: menuWithDescriptions,
        exclude,
      });
      setSuggestion(res.data.suggestion);
    } catch (err) {
      setError("AI service error");
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    const found = food_list.find(
      (item) => item.name.toLowerCase() === suggestion.toLowerCase()
    );
    if (found) {
      addToCart(found._id);
      toast.success(`AI suggestion "${found.name}" added to cart!`);
      onClose();
    } else {
      toast.error("Could not find this item in menu!");
    }
  };

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-6 right-auto m-0 z-50 bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm flex flex-col gap-4 border border-gray-100 animate-fade-in-up
      md:left-auto md:right-6 md:translate-x-0 md:m-6"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-gray-900 text-lg tracking-tight">
          AI Chef Assistant
        </div>
        <button
          onClick={onClose}
          className="text-[tomato] text-2xl font-bold transition-colors duration-150 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[tomato]"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <div>
        <textarea
          className="w-full border border-[tomato] rounded-lg p-3 mt-2 text-sm min-h-[48px] focus:outline-none focus:ring-2 focus:ring-[tomato] mb-2 resize-none transition-all"
          placeholder="Please briefly describe your food craving or taste preferences."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          disabled={loading}
          rows={2}
        />
        {error && <div className="text-red-500 text-xs mb-2">{error}</div>}

        <div className="w-full">
          <div className="mb-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative flex items-center justify-center">
                  <img
                    src={assistantIcon}
                    alt="Assistant Loading"
                    className="w-16 h-16 z-10 animate-fade-in"
                  />
                  <span
                    className="absolute w-20 h-20 rounded-full border-4 border-[tomato] border-t-transparent animate-spin"
                    style={{
                      borderTopColor: "#fff5f0",
                      borderRightColor: "#ffb199",
                    }}
                  ></span>
                </div>
                <span className="mt-4 text-[tomato] font-semibold text-sm animate-pulse">
                  Thinking...
                </span>
              </div>
            ) : !suggestion ? (
              <button
                className={`w-full flex items-center justify-center cursor-pointer text-white rounded-lg px-4 py-2 font-semibold border  transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[tomato] ${
                  !input
                    ? "bg-[#fc915b] hover:bg-[tomato]"
                    : "bg-[tomato] hover:bg-[#e5532d]"
                }`}
                onClick={() => askAi(input)}
                disabled={loading || !input}
                aria-label="Ask Assistant"
              >
                Ask CHEFAI
              </button>
            ) : (
              <div className="w-full flex flex-col items-center justify-center bg-white  rounded-2xl  py-4 mt-2 mb-2  relative overflow-hidden">
                <div className="absolute left-[-8px]  pointer-events-none select-none">
                  <img
                    src={assistantIcon}
                    alt="Assistant"
                    className="w-24 h-24"
                  />
                </div>
                <span className="text-[tomato] text-2xl font-extrabold tracking-tight break-words text-center drop-shadow-sm animate-fade-in-up">
                  {suggestion}
                </span>
              </div>
            )}
          </div>
        </div>

        {!loading && suggestion && (
          <div className="rounded-xl pt-4  mb-2 text-center flex flex-col items-center ">
            <button
              className="w-full cursor-pointer bg-gradient-to-r from-[tomato] to-[#e95e33] text-white rounded-lg px-4 py-2 font-semibold border hover:from-[#e5532d] hover:to-[#ffb199] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[tomato] mb-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="w-full flex cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg px-4 py-2 font-semibold border border-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => askAi(input, suggestion)}
              aria-label="Next Suggestion"
            >
              <span>Next Suggestion</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiOrderWidget;
