import React, { useEffect } from "react";
import { useContext } from "react";
import { FileAppContext } from "../context/FileContext";

const Profile = () => {
  const {} = useContext(FileAppContext);
  useEffect(() => {}, []);
  const getProfileTweets = async () => {};
  return <div>Profile</div>;
};

export default Profile;
