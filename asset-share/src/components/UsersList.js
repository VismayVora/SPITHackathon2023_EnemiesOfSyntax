import React, { useContext, useEffect } from "react";
import { FileAppContext } from "../context/FileContext";
import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();
const UsersList = () => {
  const { friendLists, userList, addFriends } = useContext(FileAppContext);
  useEffect(() => {
    console.log(friendLists);
    console.log(userList);
    // console.log(generator.generateRandomAvatar());
  }, [friendLists, userList]);
  return (
    <div>
      <div className="flex flex-wrap">
        {userList?.map((user) => (
          <div className="p-4 ml-4">
            <img className="w-[70px]" src={generator.generateRandomAvatar()} />
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
              Make Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
