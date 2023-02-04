import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import web32 from "web3";
import web3modal from "web3modal";
import {
  connectWallet,
  connectWithChatContract,
  connectWithContract,
} from "../api";
import axios from "axios";
export const FileAppContext = React.createContext();
export const FileAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [myFiles, setMyFiles] = useState([]);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [userList, setUserLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");
  const [balance, setBalance] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const getBalance = async (address) => {
    // const web3 = new web3modal();
    // const connection = await web3.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const balance = await provider.getBalance(address);
    // console.log(balance);
    const web322 = new web32(web32.givenProvider);
    console.log(await web322.eth.getBalance(address));
    setBalance(await web322.eth.getBalance(address));
  };
  const createAUser = async (name) => {
    const contract = await connectWithContract();
    try {
      const keys = await axios.get("http://localhost:3001/api/getPubPriKey");
      console.log(keys.data);
      const user = await contract.createUser(
        keys.data.public_key,
        keys.data.private_key
      );
      console.log(user);
      const chatcontract = await connectWithChatContract();
      const getCreatedUser = await chatcontract.createAccount(name);
      // setLoading(true);
      await getCreatedUser.wait();
      // setLoading(false);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const getPublicKey = async () => {
    const contract = await connectWithContract();
    try {
      const key = await contract.getPublicKey();
      console.log(key);
      setPublicKey(key);
    } catch (e) {
      console.log(e);
    }
  };

  const getPrivateKey = async () => {
    const contract = await connectWithContract();
    try {
      const key = await contract.getPrivateKey();
      console.log(key);
      setPrivateKey(key);
    } catch (e) {
      console.log(e);
    }
  };

  const decryptText = async (hashes) => {
    hashes.forEach(async (hash) => {
      console.log(hash.hash);
      console.log(privateKey);
      const text = await axios.post(
        "http://localhost:3001/api/getDecryptedText",
        {
          hash: hash.hash,
          private_key: privateKey,
        }
      );
      console.log(text);
      if (text.data.access) {
        setReceivedFiles((receivedFiles) => [
          ...receivedFiles,
          {
            hash: text.data.message,
            name: hash.fileName,
            desc: hash.description,
            senderName: hash.senderName,
          },
        ]);
      }
      console.log(...receivedFiles);
    });
    console.log("Hello");
    return [];
  };

  const getReceivedFiles = async () => {
    const contract = await connectWithContract();
    try {
      const files = await contract.getReceivedFiles();
      console.log(files);

      let hashes = await decryptText(files);
    } catch (e) {
      console.log(e);
    }
  };

  const connection = async () => {
    console.log("Hello");
    try {
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
    } catch (e) {
      console.log(e);
    }
  };

  // const createAccount = async ({ name, accountAddress }) => {
  //   try {
  //     // if (name || accountAddress)
  //     //   return setError("Name And AccountAddress, cannot be emty");

  //     const contract = await connectingWithContract();
  //     const getCreatedUser = await contract.createAccount(name);
  //     setLoading(true);
  //     await getCreatedUser.wait();
  //     setLoading(false);
  //     window.location.reload();
  //   } catch (error) {
  //     setError("Error while creating your account Pleas reload browser");
  //   }
  // };

  const fetchData = async () => {
    try {
      //GET CONTRACT
      const contract = await connectWithChatContract();
      //GET ACCOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      console.log(connectAccount);
      //GET USER NAME
      const userName = await contract.getUsername(connectAccount);
      console.log(userName);
      setName(userName);
      //GET MY FRIEND LIST
      const friendLists = await contract.getMyFriendList();
      console.log(friendLists);
      setFriendLists(friendLists);
      // //GET ALL APP USER LIST
      const userList = await contract.getAllAppUser();
      console.log(userList);
      setUserLists(userList);
      getBalance(connectAccount);
    } catch (error) {
      // setError("Please Install And Connect Your Wallet");
      console.log(error);
    }
  };

  const addFriends = async ({ name, accountAddress }) => {
    try {
      // if (name || accountAddress) return setError("Please provide data");

      const contract = await connectWithChatContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      await addMyFriend.wait();
      window.location.reload();
    } catch (error) {
      setError("Something went wrong while adding friends, try again");
    }
  };

  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectWithChatContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      console.log("Currently You Have no Message");
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      // if (msg || address) return setError("Please Type your Message");

      const contract = await connectWithChatContract();
      const addMessage = await contract.sendMessage(address, msg);

      await addMessage.wait();

      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };

  //READ INFO
  const readUser = async (userAddress) => {
    const contract = await connectWithChatContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  return (
    <FileAppContext.Provider
      value={{
        account,
        connection,
        createAUser,
        getPublicKey,
        getReceivedFiles,
        getPrivateKey,
        publicKey,
        privateKey,
        receivedFiles,
        name,
        friendLists,
        userList,
        addFriends,
        readMessage,
        sendMessage,
        friendMsg,
        readUser,
        currentUserAddress,
        currentUserName,
        balance,
      }}
    >
      {children}
    </FileAppContext.Provider>
  );
};
