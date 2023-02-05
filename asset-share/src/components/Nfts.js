import React, { useContext, useEffect, useState } from "react";
import { connectWithNftContract } from "../api";
import { FileAppContext } from "../context/FileContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Nfts = () => {
  const { account } = useContext(FileAppContext);
  const [t, setT] = useState([]);
  useEffect(() => {
    getNfts();
  }, []);
  const getNfts = async () => {
    const contract = await connectWithNftContract();
    const tweets = await contract.getUserNfts();
    console.log(tweets);
    setT(tweets);
  };
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="p-8 bg-gray-800 w-[60%] rounded-xl">
          <h1 className="text-5xl font-bold">My NFTS</h1>
          <div className=""></div>
          {t.length > 0 ? (
            <div className="mt-2">
              {t.map((e) => (
                <div className="mt-4">
                  <a className="mt-2" target="_blank" href={e.ipfs_hash}>
                    {e.ipfs_hash}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1>No NFTS</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nfts;
