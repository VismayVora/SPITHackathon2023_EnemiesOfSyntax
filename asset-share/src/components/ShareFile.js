import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FileAppContext } from "../context/FileContext";
import { Web3Storage } from "web3.storage";
import { connectWithContract } from "../api";
import Navbar from "./Navbar";
import meditation from "../assets/meditation.png";
const ShareFile = () => {
  const [file, setFile] = useState([]);

  const {
    account,
    connection,
    createAUser,
    getReceivedFiles,
    getPublicKey,
    getPrivateKey,
    publicKey,
    privateKey,
    receivedFiles,
    name,
  } = useContext(FileAppContext);
  const [pubKey, setPubKey] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [mssg, setMssg] = useState("");
  const [hash, setHash] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [yourName, setYourName] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUserName] = useState("");
  useEffect(() => {
    // fetchData();
    console.log(receivedFiles);
  }, [receivedFiles]);
  const getKeys = async () => {
    const keys = await axios.get("http://localhost:3001/api/getPubPriKey");
    console.log(keys.data);
    setPubKey(keys.data.public_key);
    setPrivKey(keys.data.private_key);
  };
  const encryptText = async (text, pkey) => {
    const hash = await axios.post(
      "http://localhost:3001/api/getEncryptedText",
      {
        message: text,
        public_key: pkey,
      }
    );
    console.log(hash.data.encryptedText);
    setHash(hash.data.encryptedText);
    return hash.data.encryptedText;
  };

  const uploadFile2 = async () => {
    try {
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
      console.log(cid);
      const contract = await connectWithContract();
      const p = await contract.getReceiverPublicKey(receiverAddress);
      console.log(p);
      try {
        const hash = await encryptText(cid, p);
        const send = await contract.sendFile(
          receiverAddress,
          file.name,
          yourName,
          description,
          cid,
          hash
        );
        console.log(send);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveFile = (e) => {
    e.preventDefault();
    const files = e.target.files;
    console.log(files[0]);
    const { length } = files;
    const reader = new FileReader();
    if (length === 0) {
      return false;
    }

    const { size, type } = files[0];

    reader.readAsDataURL(files[0]);
    setFile(files[0]);
  };
  return (
    <div className="bg-[#10141A] h-screen">
      {account.length > 0 ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-around">
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
            ) : null}
            <button
              className="text-white font-semibold bg-[#556195] px-4 py-2"
              onClick={() => getReceivedFiles()}
            >
              Get receivedFiles
            </button>
            <button
              className="text-white font-semibold bg-[#556195] px-4 py-2"
              onClick={() => getPublicKey()}
            >
              Get public key
            </button>
            <button
              className="text-white font-semibold bg-[#556195] px-4 py-2"
              onClick={() => getPrivateKey()}
            >
              Get private key
            </button>
          </div>
          <div className="flex flex-col min-w-[50%] mt-16  self-center max-h-lg">
            <input
              type="text"
              placeholder="Enter Name"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              className="mt-8 bg-[#0D0B0B] p-2 text-white"
            />
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-8 bg-[#0D0B0B] p-2 text-white"
            />
            <input
              type="text"
              placeholder="Enter Wallet Address"
              value={receiverAddress}
              onChange={(e) => setReceiverAddress(e.target.value)}
              className="mt-8 bg-[#0D0B0B] p-2 text-white"
            />
            <input
              type="file"
              onChange={(e) => retrieveFile(e)}
              className="mt-8 bg-[#0D0B0B] p-2 text-white"
            />

            <button
              onClick={() => {
                uploadFile2();
              }}
              className="self-end min-w-[100px] text-white font-semibold bg-[#556195] px-4 py-2 mt-8"
            >
              Send >
            </button>
          </div>
          {receivedFiles.length > 0 ? (
            <div className="p-4 bg-[#10141A]">
              <h1 className="text-white text-2xl">Files</h1>
              <div className="flex justify-around">
                <p className="text-white">Sender Name</p>
                <p className="text-white">Description</p>
                <p className="text-white">File Name</p>
              </div>
              {receivedFiles.map((file) => (
                <div className="flex justify-around">
                  {/* <table>
                    <thead>
                      <tr>
                        <th>Sender Name</th>
                        <th>Description</th>
                        <th>File</th>
                      </tr>
                    </thead>
                  </table> */}
                  <p className="text-slate-300">{file.senderName}</p>
                  <p className="text-slate-300">{file.desc}</p>
                  <a
                    href={`https://ipfs.io/ipfs/${file.hash}/${file.name}`}
                    key={file}
                    className="text-slate-300"
                    target="_blank"
                  >
                    {file.name}
                  </a>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className=" mt-4 flex flex-col items-center justify-center">
          <img src={meditation} />
          <button
            className="text-white font-semibold bg-[#556195] px-4 py-2 mt-4"
            onClick={() => connection()}
          >
            Connect Account
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareFile;
