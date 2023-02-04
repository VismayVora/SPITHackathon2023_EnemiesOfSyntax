import React, { useContext, useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";
import { FileAppContext } from "../context/FileContext";
import Modal from "react-modal";
import { OpenAIApi, Configuration } from "openai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
const Tweets = () => {
  const [desc, setDesc] = useState("");
  const config = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(config);
  const { createAUser, name, connectWithTwitterContract } =
    useContext(FileAppContext);
  const [username, setUserName] = useState("");
  const [tweetText, setTweetText] = useState("");
  const [file, setFile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [imgurl, setImgUrl] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const fetchTweets = async () => {
    const contract = await connectWithTwitterContract();
    const tweets = await contract.getTweets();
    setTweets(tweets);
    console.log(tweets);
  };
  const listenToTweet = async () => {
    const contract = await connectWithTwitterContract();
    contract.on("addTweetEvent", () => {
      fetchTweets();
    });
  };
  useEffect(() => {
    fetchTweets();
    listenToTweet();
  }, []);

  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: desc,
      n: 1,
      size: "1024x1024",
    });
    console.log(response.data.data[0].url);
    const url = response.data.data[0].url;
    setImgUrl(url);
  };

  const tweetKaro = async () => {
    const responseText = await axios.post(
      "https://44f1-125-99-120-242.ngrok.io/detect_hate_text/",
      {
        text: tweetText,
      }
    );
    console.log(responseText.data.hate);
    if (!responseText.data.hate) {
      console.log("Hello");
      const web3 = new Web3Storage({
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVlOThGNzY1YjgzRGU0NTRhM2JDMzZjMDA1MTFFNjgzZTIxNkQwQTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA5NDA2MTQyODQsIm5hbWUiOiJNZW50b3JEb3RzIn0.FkP0BvIf_J6_ToxB9ER-QW01uukz5W5Me-mcoT1OYJI",
      });

      console.log(file);
      const ext = file.name.split(".").pop();
      const newFile = new File([file], file.name, { type: file.type });
      const cid = await web3.put([newFile], {
        name: file.name,
      });
      const url = `https://ipfs.io/ipfs/${cid}/${file.name}`;
      console.log(url);
      const contract = await connectWithTwitterContract();
      const response = await contract.addTweet(url, tweetText, name);
      console.log(response);
    } else {
      toast.error("Dont use appropriate language", {
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
  const tweetAI = async () => {
    const contract = await connectWithTwitterContract();
    const response = await contract.addTweet(imgurl, tweetText, name);
    console.log(response);
  };
  return (
    <>
      {!name ? (
        <div className="flex">
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            className="text-white font-semibold bg-[#556195] px-4 py-2"
            onClick={() => createAUser(username)}
          >
            Create User
          </button>
        </div>
      ) : (
        <div>
          <ToastContainer />
          <h1>Use AI to generate Image for your tweet</h1>
          <input value={desc} onChange={(e) => setDesc(e.target.value)} />
          {imgurl.length > 0 ? (
            <div>
              <img className="h-32 w-32" src={imgurl} />
            </div>
          ) : null}
          <button onClick={() => generateImage()}>Generate Image</button>
          <button onClick={() => tweetAI()}>Tweet AI Generated Photo</button>
          <input
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            type="text"
            placeholder="Enter Tweet"
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button
            onClick={() => {
              tweetKaro();
            }}
          >
            Tweet Karo Dost
          </button>
          <div>
            {tweets.length > 0
              ? tweets.map((tweet) => (
                  <div key={tweet.tweet_msg}>
                    <h1>{tweet.userName}</h1>
                    <h2>{tweet.tweet_msg}</h2>
                    <img src={tweet.image_url} />
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};

export default Tweets;
