import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "Musab",
    email: "arikan950@gmail.com",
    password: "123456789",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } else {
      newUrl += "/api/user/register";
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setCurrState("Login");
      } else {
        alert(response.data.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-black/50 grid animate-fade-in">
      <form
        onSubmit={onLogin}
        className="place-self-center w-[max(23vw,330px)] text-gray-500 bg-white flex flex-col gap-6 p-6 rounded-lg text-sm"
      >
        <div className="flex justify-between items-center text-[tomato]">
          <h2 className="text-xl font-semibold">{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            className="w-4 cursor-pointer"
            alt="Close"
          />
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your name"
              required
              className="outline-none border border-gray-300 p-2.5 rounded"
            />
          )}

          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
            className="outline-none border border-gray-300 p-2.5 rounded"
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
            className="outline-none border border-gray-300 p-2.5 rounded"
          />
        </div>
        <button className="border-none p-2.5 text-white bg-[tomato] rounded cursor-pointer text-sm hover:bg-[#ff4500] ">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-start gap-2 -mt-4">
          <input type="checkbox" defaultChecked required className="mt-1" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-[tomato] font-medium cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-[tomato] font-medium cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
