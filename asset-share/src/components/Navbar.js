import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FileAppContext } from "../context/FileContext";
import "./Navbar.css";
const Navbar = () => {
  const { name } = useContext(FileAppContext);
  // useEffect(() => {
  //   console.log(name);
  // }, []);
  const navigate = useNavigate();
  return (
    <div className="flex flex-row p-4 items-center justify-between bg-[#10141A]">
      <div className="flex flex-row items-center">
        <img src={logo} />
        <h1 className="text-white text-2xl ml-4 font-semibold flex flex-row font-poppins">
          Block <h1 className="font-light"> Crate</h1>
        </h1>
      </div>
      <div className="flex flex-row items-center flex-1 justify-evenly">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="text-white text-xl cursor-pointer"
        >
          Home
        </h1>
        <h1
          onClick={() => {
            navigate("/assets");
          }}
          className="text-white text-xl cursor-pointer"
        >
          Assets
        </h1>
        <h1
          onClick={() => {
            navigate("/chat");
          }}
          className="text-white text-xl cursor-pointer"
        >
          Chat
        </h1>
        <h1
          onClick={() => {
            navigate("/news");
          }}
          className="text-white text-xl cursor-pointer"
        >
          News Feed
        </h1>
        {name ? <h1 className="text-white text-xl">{name}</h1> : null}
      </div>
    </div>
  );
};

export default Navbar;
