import axios from "axios";
import React, { useEffect, useState } from "react";
import { connectWithTwitterContract } from "../api";
import Sidebar from "./Sidebar";
import { AvatarGenerator } from "random-avatar-generator";
import Navbar from "./Navbar";
const generator = new AvatarGenerator();
const Card = ({ tweet, count, connectWithTwitterContract }) => {
  const [days, setDays] = useState(1);
  const putIntoVoting = async () => {
    const contract = await connectWithTwitterContract();
    try {
      const resp = await contract.addPostToVote(parseInt(tweet.uid._hex), days);
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div
      className="mt-8 bg-gray-900 max-w-[50vw] px-8 py-6 rounded-xl flex items-start gap-2"
      key={tweet.tweet_msg}
    >
      <img className="w-12" src={generator.generateRandomAvatar()} />
      <div>
        <div className="flex justify-between items-center mb-1">
          <h1 className="text-3xl font-semibold text-white">
            {tweet.userName}
          </h1>
        </div>
        <h1 className="text-gray-400">{tweet.tweet_msg}</h1>
        <img className="rounded-xl my-2" src={tweet.image_url} />
        <h1 className="text-gray-400">Reports: {count}</h1>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          placeholder="Number of days"
          className="bg-gray-800 px-4 py-2 rounded-xl focus:outline-none text-gray-400 mr-4"
          min={1}
        />
        <button
          onClick={() => {
            putIntoVoting();
          }}
          className="mt-4 text-white font-semibold bg-red-500 rounded-xl px-4 py-2 whitespace-nowrap"
        >
          Start Voting
        </button>
      </div>
    </div>
  );
};

const Admin = () => {
  const [tweets, setTweets] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    getReportedIds();
  }, []);
  const getReportedIds = async () => {
    const contract = await connectWithTwitterContract();
    const reponse = await axios.get(
      "http://44f1-125-99-120-242.ngrok.io/report_tweet/0/"
    );
    console.log(reponse.data);
    const ids = reponse.data;
    setIds(ids);
    const allTweets = await Promise.all(
      ids.map(async (id) => {
        const tweet = await contract.tweets(id.id);
        return tweet;
      })
    );

    console.log(allTweets);
    setTweets(allTweets);
  };
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        {tweets.length > 0 ? (
          <div className="p-8 bg-gray-800 w-[60%] rounded-xl">
            <h1 className="text-5xl font-bold text-gray-100">Reports</h1>
            {tweets.map((tweet, index) => {
              console.log(tweet);
              return (
                <div>
                  <Card
                    connectWithTwitterContract={connectWithTwitterContract}
                    count={ids[index].report_count}
                    tweet={tweet}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Admin;
