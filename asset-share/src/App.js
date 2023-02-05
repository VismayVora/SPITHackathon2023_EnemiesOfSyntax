import ShareFile from "./components/ShareFile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/index";
import UsersList from "./components/UsersList";
import NewsFeed from "./components/NewsFeed";
import Assets from "./components/Assets";
import Tweets from "./components/Tweets";
import Admin from "./components/Admin";
import Vote from "./components/Vote";
import Profile from "./components/Profile";
import Nfts from "./components/Nfts";
function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/share-file" element={<ShareFile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nfts" element={<Nfts />} />
          <Route path="/" element={<Tweets />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
