import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import { connectWithTwitterContract } from "../api";
import { RiCloseFill, RiDeleteBin6Line } from "react-icons/ri";
import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();

const Card = ({ tweet }) => {
  return (
    <div
      className="bg-gray-900 max-w-[50vw] px-8 py-6 rounded-xl flex items-start gap-2 mt-8"
      key={tweet.tweet_msg}
    >
      <img className="w-12" src={generator.generateRandomAvatar()} />
      <div>
        <h1 className="text-3xl font-semibold my-2">{tweet.userName}</h1>
        <h1 className="text-gray-400">{tweet.tweet_msg}</h1>
        <img className="rounded-xl my-2" src={tweet.image_url} />
        <div className="flex gap-6 mt-4">
          <button className="bg-red-500 text-gray-100 px-4 py-2 rounded-xl flex gap-2 items-center">
            <RiDeleteBin6Line />
            Remove
          </button>
          <button className="bg-gray-500 text-gray-100 px-4 py-2 rounded-xl flex gap-2 items-center">
            <RiCloseFill />
            Don't
          </button>
        </div>
      </div>
    </div>
  );
};

const list = [
  {
    userName: "John Doe",
    tweet_msg: "This is a tweet",
    image_url: "https://picsum.photos/200/300",
  },
  {
    userName: "John Doe",
    tweet_msg: "This is a tweet",
    image_url: "https://picsum.photos/200/300",
  },
];

const Vote = () => {
  const [tweets, setTweets] = useState([]);
  const fetchTweets = async () => {
    const contract = await connectWithTwitterContract();
    const tweets = await contract.getTweets();
    setTweets(tweets);
    console.log(tweets);
  };
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <ToastContainer />
        <div className="p-8 bg-gray-800 w-[60%] rounded-xl">
          <h1 className="text-5xl font-bold">Reports</h1>
          <div className="">
            {list.length > 0 ? (
              list.map((tweet) => <Card tweet={tweet} />)
            ) : (
              <>
                <h1 className="text-2xl text-gray-400 mt-8">No Reports</h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
