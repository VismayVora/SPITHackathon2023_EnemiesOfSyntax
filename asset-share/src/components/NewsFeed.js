import "./NewsFeed.css";
import News from "./News";
import Coins from "./Coins";
function NewsFeed() {
  return (
    <div className="flex p-4">
      <News />
      <Coins />
    </div>
  );
}

export default NewsFeed;
