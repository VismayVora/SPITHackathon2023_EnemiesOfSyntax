import React, { useState, useEffect } from "react";
import { Loader } from "rsuite";
import CoinsList from "./CoinsList";
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "15b6349dcemsh9d506902b260d0fp1b6792jsna64ed0116bd9",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    const coins_api_url =
      "https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=20&offset=0";
    const fetchData = async () => {
      try {
        const response = await fetch(coins_api_url, options);
        const coins_data = await response.json();
        console.log(coins_data.data.coins);
        setCoins(coins_data.data.coins);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[40%] mx-auto  news_container">
      <h1 className="text-3xl font-bold mb-2">Coin Prices:</h1>
      {loading ? (
        <Loader backdrop content="Getting coins update..." />
      ) : (
        coins?.map((coin) => (
          <CoinsList
            key={coin.uuid}
            name={coin.name}
            price={coin.price}
            change={coin.change}
            color={coin.color}
          />
        ))
      )}
    </div>
  );
};
export default Coins;
