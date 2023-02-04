import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileAppContext } from "../context/FileContext";
import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();
const Chat = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const {
    friendLists,
    readMessage,
    sendMessage,
    friendMsg,
    account,
    currentUserName,
    readUser,
    currentUserAddress,
  } = useContext(FileAppContext);

  const [currentFriend, setCurrentFriend] = useState([]);
  useEffect(() => {
    console.log(friendLists);
    if (friendLists) {
      setCurrentFriend(friendLists[0]);
      readMessage(friendLists[0]?.pubkey);
      readUser(friendLists[0]?.pubkey);
    }
  }, [friendLists]);

  useEffect(() => {
    console.log(friendMsg);
    console.log(account);
  }, [friendMsg]);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/users");
        }}
        className="text-white font-semibold bg-[#556195] px-4 py-2"
      >
        Get User List
      </button>
      <div className="flex">
        <div>
          {friendLists?.map((friend) => (
            <div
              onClick={() => {
                readMessage(friend.pubkey);
                readUser(friend.pubkey);
              }}
              className="p-4"
            >
              <img
                className="w-[30px]"
                src={generator.generateRandomAvatar()}
              />
              <h1 className="mt-2">{friend?.pubkey}</h1>
            </div>
          ))}
        </div>
        <div className="ml-8 flex-1">
          <h1 className="text-xl mb-2 font-bold">{currentUserName}</h1>
          {friendMsg?.map((text) => (
            <div
              className={
                account.toLowerCase() == text.sender.toLowerCase()
                  ? `p-4 bg-[#EB455F] mb-2 rounded w-fit ml-auto mr-[100px]`
                  : `p-2 bg-[#C0DEFF] mb-2 rounded w-fit`
              }
            >
              <h1 key={text}>{text.msg}</h1>
            </div>
          ))}
          <div className="flex">
            <input
              placeholder="Enter message"
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              className="w-[40%]"
            />
            <button
              onClick={() => {
                console.log("Hello");
                sendMessage({ msg: msg, address: currentUserAddress });
              }}
              className="text-white font-semibold bg-[#556195] px-4 py-2 ml-4"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
