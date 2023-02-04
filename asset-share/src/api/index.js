import { ethers } from "ethers";
import web3modal from "web3modal";
import {
  ChatAppABI,
  ChatAppAddress,
  FileShareABI,
  FileShareAddress,
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
