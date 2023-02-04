import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { connectWithTwitterContract } from "../api";
import { RiCloseFill, RiDeleteBin6Line } from "react-icons/ri";
import { AvatarGenerator } from "random-avatar-generator";
import { FileAppContext } from "../context/FileContext";
const generator = new AvatarGenerator();

const Card = ({ tweet, connectWithTwitterContract, account }) => {
  // useEffect(() => {
  //   getLivePeriod();
  // }, []);
  // const getLivePeriod = async () => {
  //   const contract = await connectWithTwitterContract();
  //   const time = await contract.votingTime(parseInt(tweet.uid._hex));
  //   console.log(Date(time * 1000));
  // };

  const getResults = async () => {
    try {
      const contract = await connectWithTwitterContract();
      const response = await contract.getResultsOfTweet(
        parseInt(tweet.uid._hex)
      );
      console.log(response);
    } catch (e) {
      console.log(e);
      toast.error("Voting is not yet over", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    checkIfUserIsOwner();
  }, []);
  const checkIfUserIsOwner = async () => {
    const contract = await connectWithTwitterContract();
    const owner = await contract.owner();
    if (owner.toLowerCase() === account.toLowerCase()) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };
  const casteTheVote = async (vote) => {
    const contract = await connectWithTwitterContract();
    try {
      const response = await contract.voteForRemoval(
        parseInt(tweet.uid._hex),
        vote
      );
      console.log(response);
    } catch (e) {
      toast.error("Already Voted for this tweet", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
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
          <button
            onClick={() => casteTheVote(true)}
            className="bg-red-500 text-gray-100 px-4 py-2 rounded-xl flex gap-2 items-center"
          >
            <RiDeleteBin6Line />
            Remove
          </button>
          <button
            onClick={() => casteTheVote(false)}
            className="bg-gray-500 text-gray-100 px-4 py-2 rounded-xl flex gap-2 items-center"
          >
            <RiCloseFill />
            Don't
          </button>
        </div>
        {isOwner ? (
          <button
            onClick={() => {
              getResults();
            }}
            className="mt-4 bg-green-500 text-gray-100 px-4 py-2 rounded-xl flex gap-2 items-center"
          >
            Get Results
          </button>
        ) : null}
      </div>
    </div>
  );
};

const Vote = () => {
  const { connectWithTwitterContract, account } = useContext(FileAppContext);
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    getVotingTweets();
  }, []);
  const getVotingTweets = async () => {
    const contract = await connectWithTwitterContract();
    const t = await contract.getVotingTweets();
    const ts = await Promise.all(
      t.map(async (r) => {
        const g = await contract.tweets(parseInt(r._hex));
        return g;
      })
    );
    console.log(ts);
    setTweets(ts);
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

export default Vote;
