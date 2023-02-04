import React, { useContext, useEffect } from "react";
import { FileAppContext } from "../context/FileContext";
import { AvatarGenerator } from "random-avatar-generator";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
const generator = new AvatarGenerator();
const UsersList = () => {
  const { userList, addFriends } = useContext(FileAppContext);
  // useEffect(() => {
  //   console.log(friendLists);
  //   console.log(userList);
  // }, [friendLists, userList]);
  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 ">
      <Navbar />
      <div className="h-full">
        <div className="flex">
          <Sidebar />
          <div className="flex flex-wrap">
            {userList?.map((user) => (
              <div className="p-4 ml-4">
                <img
                  className="w-[70px]"
                  src={generator.generateRandomAvatar()}
                />
                <h1>{user.name}</h1>
                <h1>{user.accountAddress.slice(0, 25)}..</h1>
                <button
                  onClick={() => {
                    addFriends({
                      name: user.name,
                      accountAddress: user.accountAddress,
                    });
                  }}
                  className="text-white font-semibold bg-[#556195] px-4 py-2 mt-2"
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
