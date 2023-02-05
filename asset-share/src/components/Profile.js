import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { connectWithNftContract, connectWithTwitterContract } from "../api";
import { FileAppContext } from "../context/FileContext";
import Navbar from "./Navbar";
import { AvatarGenerator } from "random-avatar-generator";
import Sidebar from "./Sidebar";
import { Web3Storage } from "web3.storage";
import { ethers } from "ethers";
const generator = new AvatarGenerator();
const Card = ({ tweet, account }) => {
  const mintAnNft = async () => {
    const web3 = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVlOThGNzY1YjgzRGU0NTRhM2JDMzZjMDA1MTFFNjgzZTIxNkQwQTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA5NDA2MTQyODQsIm5hbWUiOiJNZW50b3JEb3RzIn0.FkP0BvIf_J6_ToxB9ER-QW01uukz5W5Me-mcoT1OYJI",
    });
    const contract = await connectWithNftContract();
    const obj = {
      mssg: tweet.tweet_msg,
      image_url: tweet.image_url,
    };
    const blob = new Blob([JSON.stringify(obj)], {
      type: "application/json",
    });
    const file = new File([blob], "hello.json");
    const cid = await web3.put([file], {
      name: file.name,
    });
    const url = `https://ipfs.io/ipfs/${cid}/${file.name}`;
    const response = await contract.makeAnEpicNFT(url);
    console.log(response);
  };
  return (
    <div
      className="bg-gray-900 max-w-[50vw] px-8 py-6 rounded-xl flex items-start gap-2 mt-8"
      key={tweet.tweet_msg}
    >
      <img className="w-12" src={generator.generateRandomAvatar()} />
      <div>
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold">{tweet.userName}</h1>
        </div>
        <h1 className="text-gray-400">{tweet.tweet_msg}</h1>
        {tweet.image_url.endsWith(".png") ||
        tweet.image_url.endsWith(".jpg") ||
        tweet.image_url.endsWith(".jpeg") ||
        tweet.image_url.endsWith(".gif") ? (
          <img className="rounded-xl my-2" src={tweet.image_url} />
        ) : tweet.image_url.endsWith(".mp4") ||
          tweet.image_url.endsWith(".mov") ||
          tweet.image_url.endsWith(".avi") ||
          tweet.image_url.endsWith(".mkv") ? (
          <video className="rounded-xl my-2" controls>
            <source
              src={tweet.image_url}
              type={
                `video/` +
                tweet.image_url.split(".")[
                  tweet.image_url.split(".").length - 1
                ]
              }
            />
          </video>
        ) : (
          <audio className="rounded-xl my-2" controls>
            <source
              src={tweet.image_url}
              type={
                `audio/` +
                tweet.image_url.split(".")[
                  tweet.image_url.split(".").length - 1
                ]
              }
            />
          </audio>
        )}
        <button
          onClick={() => mintAnNft()}
          className="text-white font-semibold bg-green-500 rounded-xl px-4 py-2 whitespace-nowrap mt-4"
        >
          Mint IT!!!
        </button>
      </div>
    </div>
  );
};

const Profile = () => {
  const { connectWithTwitterContract, account } = useContext(FileAppContext);
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    getProfileTweets();
  }, []);
  const getProfileTweets = async () => {
    const contract = await connectWithTwitterContract();
    const tweets = await contract.getUserTweets();
    console.log(tweets);
    setTweets(tweets);
  };
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <ToastContainer />
        <div className="p-8 bg-gray-800 w-[60%] rounded-xl">
          <h1 className="text-5xl font-bold">My Posts</h1>
          <div className="">
            {tweets.length > 0 ? (
              tweets.map((tweet) => (
                <Card
                  connectWithTwitterContract={connectWithTwitterContract}
                  tweet={tweet}
                  account={account}
                />
              ))
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

export default Profile;
