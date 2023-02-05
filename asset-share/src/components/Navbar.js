import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FileAppContext } from "../context/FileContext";
import { AvatarGenerator } from "random-avatar-generator";
import { FiSearch } from "react-icons/fi";
const generator = new AvatarGenerator();

const Navbar = () => {
  const { name } = useContext(FileAppContext);
  // useEffect(() => {
  //   console.log(name);
  // }, []);
  const navigate = useNavigate();
  return (
    <div className="flex flex-row py-6 px-12 items-center justify-between bg-gray-900">
      <div className="flex flex-row items-center">
        <img className="w-8" src={logo} />
        <h1 className="text-white text-2xl ml-2 font-semibold flex flex-row font-poppins">
          D<h1 className="font-light">witter</h1>
        </h1>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-gray-600 hover:border-gray-400 min-w-[50%] text-gray-100 px-4 py-2">
        <FiSearch className="text-xl" />
        <input
          placeholder="Search for something here..."
          className="bg-transparent focus:outline-none w-full"
        />
      </div>
      <div className="flex gap-4 items-center">
        {name ? (
          <h1
            onClick={() => navigate("/profile")}
            className="text-white text-2xl cursor-pointer"
          >
            {name}
          </h1>
        ) : null}
        <img className="w-8" src={generator.generateRandomAvatar()} />
      </div>
    </div>
  );
};

export default Navbar;
