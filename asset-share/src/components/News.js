import React, { useState, useEffect } from "react";
import { Loader } from "rsuite";
import NewsList from "./NewsList";
import axios from "axios";
const News = () => {
  const [newsData, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "b918a4a88b91461cbb5923734af9c509";
  const query = "Crypto";
  const api_url = `https://newsapi.org/v2/everything?q=${query}&from=2022-12-15&sortBy=popularity&apiKey=${API_KEY}`;
  const [blogData, setBlogData] = useState([]);
  useEffect(() => {
    getBlogData();
  }, []);

  const getBlogData = async () => {
    const response = await axios.get(api_url);
    setBlogData(response.data.articles.slice(0, 5));
    setLoading(false);
    console.log(response.data.articles.slice(0, 5));
  };

  return (
    <div className="w-[40%] mx-auto  news_container">
      <h1 className="text-3xl font-bold mb-2">News :</h1>
      {loading ? (
        <Loader backdrop content="Getting latest news..." />
      ) : (
        blogData?.map((data) => (
          <NewsList
            className=""
            key={data.urlToImage}
            title={data.title}
            img={data.urlToImage}
            link={data.url}
          />
        ))
      )}
    </div>
  );
};

export default News;
