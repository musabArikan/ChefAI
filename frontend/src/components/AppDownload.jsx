import React from "react";
import { assets } from "../assets/assets";

const AppDownload = () => {
  return (
    <div
      className="mx-auto mt-[100px] text-center font-medium"
      style={{ fontSize: "max(3vw, 20px)" }}
      id="app-download"
    >
      <p>
        For Better Experience Download <br />
        ChefAI App
      </p>
      <div
        className="flex justify-center mt-10 "
        style={{ gap: "max(2vw, 10px)" }}
      >
        <img
          src={assets.play_store}
          alt=""
          className="cursor-pointer transition-all duration-500 hover:scale-105 max-w-[180px]"
          style={{ width: "max(30vw, 120px)" }}
        />
        <img
          src={assets.app_store}
          alt=""
          className="cursor-pointer transition-all duration-500 hover:scale-105 max-w-[180px]"
          style={{ width: "max(30vw, 120px)" }}
        />
      </div>
    </div>
  );
};

export default AppDownload;
