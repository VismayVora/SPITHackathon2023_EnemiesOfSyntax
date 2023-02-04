import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FileAppContext } from "../context/FileContext";
import {
  RiHome7Line,
  RiChat1Line,
  RiUserLine,
  RiNewspaperLine,
  RiLogoutBoxLine,
  RiAdminLine,
  RiFile2Fill,
} from "react-icons/ri";

const Sidebar = () => {
  const { connectWithTwitterContract, account } = useContext(FileAppContext);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    isOwner();
  }, []);
  const isOwner = async () => {
    const contract = await connectWithTwitterContract();
    const ownerAddress = await contract.owner();
    if (ownerAddress.toLowerCase() === account.toLowerCase()) {
      setIsAdmin(true);
    }
  };
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
        <RiFile2Fill className="text-3xl text-white" />
        <h1
          onClick={() => {
            navigate("/share-file");
          }}
          className="text-white text-xl"
        >
          Share File
        </h1>
      </div>
      {isAdmin ? (
        <div className="flex gap-4 cursor-pointer">
          <RiAdminLine className="text-3xl text-white" />
          <h1
            onClick={() => {
              navigate("/admin");
            }}
            className="text-white text-xl"
          >
            Admin
          </h1>
        </div>
      ) : null}
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
