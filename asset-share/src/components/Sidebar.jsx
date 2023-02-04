import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { FileAppContext } from "../context/FileContext";
import {
  RiHome7Line,
  RiChat1Line,
  RiUserLine,
  RiNewspaperLine,
  RiLogoutBoxLine,
} from "react-icons/ri";

const Sidebar = () => {
  const { name } = useContext(FileAppContext);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-[20%] items-start py-8 px-12 gap-6 bg-gray-900">
      <div className="flex gap-4 cursor-pointer">
        <RiHome7Line className="text-3xl text-white" />
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="text-white text-xl"
        >
          Home
        </h1>
      </div>
      <div className="flex gap-4 cursor-pointer">
        <RiChat1Line className="text-3xl text-white" />
        <h1
          onClick={() => {
            navigate("/chat");
          }}
          className="text-white text-xl"
        >
          Chat
        </h1>
      </div>
      <div className="flex gap-4 cursor-pointer">
        <RiUserLine className="text-3xl text-white" />
        <h1
          onClick={() => {
            navigate("/users");
          }}
          className="text-white text-xl"
        >
          Users
        </h1>
      </div>
      <div className="flex gap-4 cursor-pointer">
        <RiNewspaperLine className="text-3xl text-white" />
        <h1
          onClick={() => {
            navigate("/news");
          }}
          className="text-white text-xl"
        >
          News
        </h1>
      </div>
      <div className="flex gap-4 cursor-pointer">
        <RiLogoutBoxLine className="text-3xl text-red-500" />
        <h1
          onClick={() => {
            navigate("/news");
          }}
          className="text-white text-xl text-red-500"
        >
          Logout
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;
