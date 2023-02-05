import React, { useContext, useEffect, useState } from "react";
import { Web3Storage } from "web3.storage";
import { FileAppContext } from "../context/FileContext";
import { OpenAIApi, Configuration } from "openai";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import {
  RiFlag2Line,
  RiChat1Line,
  RiRepeatLine,
  RiHeartLine,
  RiShareForwardBoxFill,
  RiHeartFill,
} from "react-icons/ri";
import { FaArrowCircleUp } from "react-icons/fa";
import { AvatarGenerator } from "random-avatar-generator";
import Sidebar from "./Sidebar";
import Modal from "react-modal";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
const generator = new AvatarGenerator();

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button className="fixed bottom-4 right-4 text-5xl text-sky-500">
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </button>
  );
};

const Card = ({ tweet, connectWithTwitterContract }) => {
  const [likes, setLikes] = useState(null)
  const [liked, setLiked] = useState(false)
  const reportATweet = async () => {
    try {
      const contract = await connectWithTwitterContract();
      const response = await contract.checkIfAlreadyReported(
        parseInt(tweet.uid._hex)
      );
      const res = await axios.post(
        `http://44f1-125-99-120-242.ngrok.io/report_tweet/${parseInt(
          tweet.uid._hex
        )}/`
      );
      console.log(response);
      console.log(res);
    } catch (e) {
      console.log(e);
      toast.error("Already Reported", {
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
  const getLikes = () => {
    axios.get('http://44f1-125-99-120-242.ngrok.io/like_tweet/'+parseInt(tweet.uid._hex)+'/').then((res)=>{
      console.log(res.data);
      setLikes(res.data.like_count)
    })
  }
  const likeATweet = () => {
    axios.post('http://44f1-125-99-120-242.ngrok.io/like_tweet/'+parseInt(tweet.uid._hex)+'/').then((res)=>{
      console.log(res.data);
      getLikes()
      setLiked(!liked)
    })
  }
  useEffect(() => {
    getLikes()
  }, [tweet])
  return (
    <div
      className="bg-gray-900 max-w-[50vw] px-8 py-6 rounded-xl flex items-start gap-2 mt-8"
      key={tweet.tweet_msg}
    >
      <img className="w-12" src={generator.generateRandomAvatar()} />
      <div className="w-full">
        <div className="flex justify-between items-center mb-1 w-[100%]">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-semibold">{tweet.userName}</h1>
            <h1 className="text-gray-400">.</h1>
            <h1 className="text-gray-400">@{tweet.userName}</h1>
            <h1 className="text-gray-400">.</h1>
            <h1 className="text-gray-400">
              {new Date(
                new Date().getTime() - parseInt(tweet.timestamp) * 1000
              ).getHours() > 24
                ? ""
                : new Date(
                    new Date().getTime() - parseInt(tweet.timestamp) * 1000
                  ).getHours() + "h"}
            </h1>
          </div>
          <button
            onClick={() => reportATweet()}
            className="p-2 rounded-full hover:bg-red-500/25 hover:text-red-500"
          >
            <RiFlag2Line className="text-2xl" />
          </button>
        </div>
        <h1 className="text-gray-400">{tweet.tweet_msg}</h1>
        {tweet.image_url.endsWith(".png") ||
        tweet.image_url.endsWith(".jpg") ||
        tweet.image_url.endsWith(".jpeg") ||
        tweet.image_url.endsWith(".gif") ? (
          <img className="rounded-xl my-4" src={tweet.image_url} />
        ) : tweet.image_url.endsWith(".mp4") ||
          tweet.image_url.endsWith(".mov") ||
          tweet.image_url.endsWith(".avi") ||
          tweet.image_url.endsWith(".mkv") ? (
          <video className="rounded-xl my-4" controls>
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
          <audio className="rounded-xl my-4" controls>
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
        <div className="flex justify-evenly mt-4">
          <RiChat1Line className="text-4xl rounded-full p-2 hover:bg-sky-500/25 hover:text-sky-500" />
          <RiRepeatLine className="text-4xl rounded-full p-2 hover:bg-green-500/25 hover:text-green-500" />
          <div className="flex items-center gap-1">
            {liked ? (
              <RiHeartFill
                onClick={() => likeATweet()}
                className="text-4xl rounded-full p-2 hover:bg-red-500/25 text-red-500"
              />
            ) : (
              <RiHeartLine
                onClick={() => likeATweet()}
                className="text-4xl rounded-full p-2 hover:bg-red-500/25 hover:text-red-500"
              />
            )}
            {likes && <h1 className="text-red-400">{likes}</h1>}
          </div>
          <RiShareForwardBoxFill className="text-4xl rounded-full p-2 hover:bg-sky-500/25 hover:text-sky-500" />
        </div>
      </div>
    </div>
  );
};

const Tweets = () => {
  const [desc, setDesc] = useState("");
  const config = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(config);
  const {
    createAUser,
    name,
    connectWithTwitterContract,
    userList,
    addFriends,
  } = useContext(FileAppContext);
  const [username, setUserName] = useState("");
  const [tweetText, setTweetText] = useState("");
  const [file, setFile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [imgurl, setImgUrl] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const fetchTweets = async () => {
    const contract = await connectWithTwitterContract();
    const tweets = await contract.getTweets();
    const owner = await contract.owner();
    console.log(owner);
    setTweets([...tweets].reverse());
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
    console.log(responseText.data);
    if (!responseText.data.hate) {
      if (file.type.startsWith("image/")) {
        console.log("image");
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
        axios
          .post("https://44f1-125-99-120-242.ngrok.io/detect_hate_image/", {
            url: url,
          })
          .then(async (res) => {
            if (!res.data.hate) {
              const contract = await connectWithTwitterContract();
              const response = await contract.addTweet(url, tweetText, name);
              console.log(response);
            } else {
              console.log(res.data);
              toast.error(res.data["Sensitive Image Detected"], {
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
          });
      } else if (file.type.startsWith("video/")) {
        console.log("video");
        var formdata = new FormData();
        formdata.append("file", file, file.name);
        formdata.append("filename", file.name);
        console.log(formdata);
        axios
          .post(
            "https://44f1-125-99-120-242.ngrok.io/detect_hate_video/",
            formdata
          )
          .then(async (res) => {
            if (!res.data.hate) {
              const web3 = new Web3Storage({
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVlOThGNzY1YjgzRGU0NTRhM2JDMzZjMDA1MTFFNjgzZTIxNkQwQTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA5NDA2MTQyODQsIm5hbWUiOiJNZW50b3JEb3RzIn0.FkP0BvIf_J6_ToxB9ER-QW01uukz5W5Me-mcoT1OYJI",
              });
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
              console.log(res.data);
              toast.error(res.data["Sensitive Image Detected"], {
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
          });
      } else if (file.type.startsWith("audio/")) {
        console.log("audio");
        var formdata = new FormData();
        formdata.append("file", file, file.name);
        formdata.append("filename", file.name);
        console.log(formdata);
        axios
          .post(
            "https://44f1-125-99-120-242.ngrok.io/detect_hate_audio/",
            formdata
          )
          .then(async (res) => {
            if (!res.data.hate) {
              const web3 = new Web3Storage({
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDVlOThGNzY1YjgzRGU0NTRhM2JDMzZjMDA1MTFFNjgzZTIxNkQwQTQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA5NDA2MTQyODQsIm5hbWUiOiJNZW50b3JEb3RzIn0.FkP0BvIf_J6_ToxB9ER-QW01uukz5W5Me-mcoT1OYJI",
              });
              const ext = file.name.split(".").pop();
              const newFile = new File([file], file.name, { type: file.type });
              const cid = await web3.put([newFile], {
                name: file.name,
              });
              const url = `https://ipfs.io/ipfs/${cid}/${file.name}`;
              const contract = await connectWithTwitterContract();
              const response = await contract.addTweet(url, tweetText, name);
              console.log(response);
            } else {
              console.log(res.data);
              toast.error(res.data["Hate Speech Detected"], {
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
          });
      }
    } else {
      console.log(responseText.data);
      toast.error("Use appropriate language", {
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
    const responseText = await axios.post(
      "https://44f1-125-99-120-242.ngrok.io/detect_hate_text/",
      {
        text: tweetText,
      }
    );
    console.log(responseText.data.hate);
    if (!responseText.data.hate) {
      const contract = await connectWithTwitterContract();
      const response = await contract.addTweet(imgurl, tweetText, name);
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

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="min-h-[100vh] relative">
      <ToastContainer />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        className="overflow-hidden px-8 py-6 w-[90vw] h-[90vh] m-auto mt-[5vh] bg-gray-900 text-gray-100 rounded-xl"
      >
        <div className="overflow-y-auto h-full scrollbar-none">
          <h1 className="text-4xl font-semibold mb-4">Post Tweet</h1>
          <h1>Add Description</h1>
          <textarea
            className="bg-gray-800 px-4 py-2 rounded-xl my-2 w-full focus:outline-none text-gray-400 resize-none"
            rows={5}
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            placeholder="Enter description ..."
          />
          <h1>Add media</h1>
          <input
            className="accent-gray-900 my-2"
            name="media"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <h1 className="text-2xl my-2 font-bold">OR</h1>
          <h1>Use AI to generate Image for your tweet</h1>
          <div className="flex my-2 gap-4">
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              placeholder="Enter Tweet"
              className="bg-gray-800 px-4 py-2 rounded-xl w-full focus:outline-none text-gray-400"
            />
            <button
              className="text-white font-semibold bg-sky-500 rounded-xl px-4 py-2 whitespace-nowrap"
              onClick={() => generateImage()}
            >
              Generate Image
            </button>
          </div>
          {imgurl.length > 0 ? (
            <div>
              <img className="h-32 w-32 rounded-xl" src={imgurl} />
            </div>
          ) : (
            <div className="h-32 w-32 bg-gray-800 rounded-xl"></div>
          )}
          <div className="flex my-2 gap-4">
            <button
              className="text-white font-semibold bg-sky-500 rounded-xl px-4 py-2 whitespace-nowrap"
              onClick={() => tweetAI()}
            >
              Tweet AI Generated Photo
            </button>
            <button
              className="text-white font-semibold bg-sky-500 rounded-xl px-4 py-2 whitespace-nowrap"
              onClick={() => {
                tweetKaro();
              }}
            >
              Tweet Karo Dost
            </button>
          </div>
        </div>
      </Modal>
      {!name ? (
        <div className="h-screen px-12 py-6 bg-gradient-to-t from-blue-700 via-blue-800 to-gray-900">
          <div className="flex flex-row items-center">
            <img className="w-8" src={logo} />
            <h1 className="text-white text-2xl ml-2 font-semibold flex flex-row font-poppins">
              D<h1 className="font-light">witter</h1>
            </h1>
          </div>
          <div className="flex flex-col h-[80vh] justify-evenly items-center">
            {/* <img src={landing} /> */}
            <h1 className="text-6xl w-[70%] text-center leading-snug font-semibold text-gray-100">
              A safe place to share your opinions and feelings
            </h1>
            <input
              className="bg-gray-900 px-12 py-4 rounded-xl w-2/5 focus:outline-none text-gray-400 text-2xl focus:shadow-2xl focus:shadow-sky-500"
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username..."
            />
            <button
              className="text-white text-2xl font-semibold bg-sky-500 rounded-xl px-8 py-2 whitespace-nowrap hover:shadow-2xl hover:shadow-sky-500"
              onClick={() => createAUser(username)}
            >
              Create User
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <ToastContainer />
            <div className="p-8 bg-gray-800 w-[55%] rounded-xl">
              <div className="flex justify-between">
                <h1 className="text-5xl font-bold">Home</h1>
                <button
                  className="px-12 py-1 text-xl bg-sky-500 rounded-xl font-semibold"
                  onClick={() => setIsOpen(true)}
                >
                  Add Tweet
                </button>
              </div>
              <div>
                {tweets.length > 0 ? (
                  tweets.map((tweet) => (
                    <Card
                      connectWithTwitterContract={connectWithTwitterContract}
                      tweet={tweet}
                    />
                  ))
                ) : (
                  <>
                    <h1 className="text-2xl text-gray-400 mt-8">No Tweets</h1>
                  </>
                )}
              </div>
            </div>
            <div className="w-[25vw] py-4 px-8">
              {userList.length > 0 ? (
                <div>
                  <h1 className="text-2xl font-bold">Who to follow</h1>
                  {userList.slice(0, 2).map((user) => (
                    <div className="flex items-center mt-6">
                      <img
                        className="w-12"
                        src={generator.generateRandomAvatar()}
                      />
                      <h1 className="text-lg font-semibold ml-4">
                        {user.name}
                      </h1>
                      <button
                        className="text-white font-semibold bg-sky-500 rounded-xl px-4 py-2 whitespace-nowrap ml-auto"
                        onClick={() =>
                          addFriends({
                            name: user.name,
                            accountAddress: user.accountAddress,
                          })
                        }
                      >
                        Follow
                      </button>
                    </div>
                  ))}
                  <h1 className="text-center mt-4">
                    <Link className="text-sky-500" to="/users">
                      Show more
                    </Link>
                  </h1>
                </div>
              ) : null}
              <h1 className="text-2xl font-bold mt-6">What's happening</h1>
              <div className="flex mt-4">
                <div>
                  <h1 className="text-xs font-thin">Trending</h1>
                  <h1 className="font-semibold">#SPITHackathon</h1>
                  <h1 className="text-xs font-thin">1462 tweets</h1>
                </div>
              </div>
              <div className="flex mt-4">
                <div>
                  <h1 className="text-xs font-thin">Trending</h1>
                  <h1 className="font-semibold">#Blockchain</h1>
                  <h1 className="text-xs font-thin">2355 tweets</h1>
                </div>
              </div>
              <div className="flex mt-4">
                <div>
                  <h1 className="text-xs font-thin">Trending</h1>
                  <h1 className="font-semibold">#EnemiesOfSyntax</h1>
                  <h1 className="text-xs font-thin">1531 tweets</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ScrollButton />
    </div>
  );
};

export default Tweets;
