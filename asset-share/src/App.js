import "./App.css";
import ShareFile from "./components/ShareFile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import UsersList from "./components/UsersList";
import NewsFeed from "./components/NewsFeed";
import Assets from "./components/Assets";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/" element={<ShareFile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
