import { ethers } from "ethers";
import web3modal from "web3modal";
import {
  ChatAppABI,
  ChatAppAddress,
  FileShareABI,
  FileShareAddress,
  NftAppABI,
  NFTAppAddress,
  TwitterAppABI,
  TwitterAppAddress,
} from "../constants";
export const checkIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) {
      console.log("Install Metamask");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    return accounts[0];
  } catch (e) {
    console.log(e);
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      console.log("Install Metamask");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return accounts[0];
  } catch (e) {
    console.log(e);
  }
};

export const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(FileShareAddress, FileShareABI, signerOrProvider);
};

export const fetchChatContract = (signerOrProvider) => {
  return new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);
};

export const fetchTwitterContract = async (signerOrProvider) => {
  return new ethers.Contract(
    TwitterAppAddress,
    TwitterAppABI,
    signerOrProvider
  );
};

export const fetchNftContract = async (signerOrProvider) => {
  return new ethers.Contract(NFTAppAddress, NftAppABI, signerOrProvider);
};

export const connectWithContract = async () => {
  try {
    const web3 = new web3modal();
    const connection = await web3.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    return contract;
  } catch (e) {
    console.log(e);
  }
};

export const connectWithChatContract = async () => {
  try {
    const web3 = new web3modal();
    const connection = await web3.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchChatContract(signer);
    return contract;
  } catch (e) {
    console.log(e);
  }
};

export const connectWithTwitterContract = async () => {
  try {
    const web3 = new web3modal();
    const connection = await web3.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchTwitterContract(signer);
    return contract;
  } catch (e) {
    console.log(e);
  }
};

export const connectWithNftContract = async () => {
  try {
    const web3 = new web3modal();
    const connection = await web3.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchNftContract(signer);
    return contract;
  } catch (e) {
    console.log(e);
  }
};
