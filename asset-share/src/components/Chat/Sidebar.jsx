import React, { useEffect, useState, useContext } from "react";
import { MdSearch } from "react-icons/md";
import { FileAppContext } from "../../context/FileContext";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const ChatTile = ({ friend, setUsername }) => {
  console.log(friend)
  const {
    readMessage,
    readUser,
  } = useContext(FileAppContext);
  
  return (
    <div
      onClick={() => {
        readMessage(friend.pubkey);
        readUser(friend.pubkey);
        setUsername(friend.name)
      }}
      className="w-full flex cursor-pointer items-center gap-4 px-4 py-3 bg-gray-900 border-b border-gray-600 hover:bg-purple-gray-100"
    >
      <div className="">
        <h1 className="font-semibold">{friend.name}</h1>
      </div>
    </div>
  );
};

const Sidebar = ({ setUsername }) => {
  const navigate = useNavigate();
  const {
    friendLists,
    readMessage,
    readUser,
    currentUserAddress,
  } = useContext(FileAppContext);
  useEffect(() => {
    if (friendLists) {
      setCurrentFriend(friendLists[0]);
      readMessage(friendLists[0]?.pubkey);
      readUser(currentUserAddress ? currentUserAddress : friendLists[0]?.pubkey);
      setUsername(friendLists[0]?.name);
    }
  }, [friendLists]);
  const [currentFriend, setCurrentFriend] = useState([]);
  return (
    <div className="w-1/4 h-screen bg-gray-900 text-gray-100 border-r border-gray-600">
      <div className="px-6 py-4 bg-purple-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <IoChevronBack className="text-xl cursor-pointer" onClick={() => navigate(-1)} />
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>
        <div className="flex items-center w-full my-2 p-1 bg-gray-800 rounded-full">
          <MdSearch className="text-xl text-inherit m-2" />
          <input
            placeholder="Search chat"
            className="focus:outline-none grow bg-inherit mr-2"
            type="text"
          />
        </div>
      </div>
      <div className="h-[609px] scroll-smooth scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {friendLists?.map((friend, index) => (
          <ChatTile key={index} friend={friend} setUsername={setUsername} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
