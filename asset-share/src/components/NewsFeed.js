import "./NewsFeed.css";
import News from "./News";
import Coins from "./Coins";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
function NewsFeed() {
  return (
    <div className="">
      <Navbar />
      <div className="flex bg-gray-900">
        <Sidebar />
        <News />
        <Coins />
      </div>
    </div>
  );
}

export default NewsFeed;
