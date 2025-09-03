import React from "react";
import { assets } from "../assets/assets";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="text-white bg-[#23272f] flex flex-col items-center gap-5 pt-15 md:pt-20 px-[8vw] py-5 mt-24"
      id="contact"
    >
      <div className="w-full grid grid-cols-[2fr_1fr_1fr] gap-20 footer-content max-[750px]:flex max-[750px]:flex-col max-[750px]:gap-[35px]">
        <div className="flex flex-col items-start gap-5">
          <img
            src={assets.logo}
            alt=""
            className="w-full h-[100px] md:w-[200px] md:h-[57px] object-cover logo "
          />
          <p className="text-sm font-medium text-white">
            ChefAI is your smart AI-powered chef and food ordering assistant.
            Discover personalized meal recommendations, order with ease, and
            enjoy a seamless dining experience powered by artificial
            intelligence. Let ChefAI help you find and order your next favorite
            dish!
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/arikann/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white  text-3xl"
            >
              <FaLinkedin color="white" />
            </a>
            <a
              href="https://github.com/musabArikan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-3xl"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h2 className=" text-white font-bold text-2xl">COMPANY</h2>
          <ul className="flex flex-col gap-2 list-none">
            <li className="cursor-pointer text-white transition-colors font-medium ">
              Home
            </li>
            <li className="cursor-pointer text-white transition-colors font-medium ">
              About Us
            </li>
            <li className="cursor-pointer text-white transition-colors font-medium ">
              Delivery
            </li>
            <li className="cursor-pointer text-white transition-colors font-medium ">
              Privacy Policy
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h2 className=" text-white font-bold text-2xl">GET IN TOUCH</h2>
          <ul className="flex flex-col gap-2 list-none">
            <li className="cursor-pointer text-white transition-colors font-medium ">
              +90 543 967 97 12
            </li>
            <li className="cursor-pointer text-white transition-colors font-medium ">
              info@chefai.com
            </li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-0.5 my-5 border-none bg-white " />
      <p className="text-start md:text-center font-medium footer-copyright text-white">
        Copyright 2025 © ChefAI.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
