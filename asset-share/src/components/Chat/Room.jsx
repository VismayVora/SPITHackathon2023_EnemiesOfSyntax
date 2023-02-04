import React, { useContext, useState } from "react";
import { MdInsertEmoticon } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { FileAppContext } from "../../context/FileContext";

const Header = ({ username }) => {
  const { currentUserAddress } = useContext(FileAppContext);
  return (
    <div className="w-full items-center gap-4 flex px-4 py-3 bg-gray-900 text-gray-100">
      <div className="">
        <h1 className="text-xl font-semibold">{username}</h1>
        <h1 className="">{currentUserAddress}</h1>
      </div>
    </div>
  );
};

const ChatReceived = ({ message }) => {
  return (
    <div className="py-3 px-4 w-fit bg-gray-800 text-gray-100 max-w-[70%] min-w-[100px] rounded-3xl border">
      <h1 className="">{message}</h1>
    </div>
  );
};

const ChatSend = ({ message }) => {
  return (
    <div className="py-3 px-4 w-fit bg-gray-100 max-w-[70%] min-w-[100px] rounded-3xl border ml-auto">
      <h1 className="">{message}</h1>
    </div>
  );
};

const Chats = () => {
  const { friendMsg, account } = useContext(FileAppContext);

  return (
    <div className="p-4 grow flex flex-col gap-2 overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-purple-gray-700 scrollbar-track-purple-gray-100 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      {friendMsg?.map((msg) => {
        if (account.toLowerCase() === msg.sender.toLowerCase()) {
          return <ChatSend key={msg} message={msg.msg} />;
        } else {
          return <ChatReceived key={msg} message={msg.msg} />;
        }
      })}
    </div>
  );
};

const Input = ({ input, setInput, open, setOpen, onEmojiClick }) => {
  const { sendMessage, currentUserAddress } = useContext(FileAppContext);
  const sendMsg = () => {
    if (input) {
      sendMessage({ msg: input, address: currentUserAddress });
      setInput("");
    }
  }
  return (
    <form
      className="w-full bg-gray-700 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        sendMsg({ msg: input, address: currentUserAddress });
      }}
    >
      <div className="bg-white flex items-center gap-4 rounded-2xl px-4 py-2">
        {open && (
          <div className="absolute bottom-[70px]">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              autoFocusSearch={false}
            />
          </div>
        )}
        <MdInsertEmoticon
          onClick={() => setOpen((prevState) => !prevState)}
          className="text-3xl cursor-pointer"
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="grow focus:outline-none"
          type="text"
        />
        <div
          className="p-2 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
          onClick={() =>
            sendMsg({ msg: input, address: currentUserAddress })
          }
        >
          <IoSend className="" />
        </div>
      </div>
    </form>
  );
};

const Room = ({ username }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const onEmojiClick = (emojiData, event) => {
    setInput((prevState) => prevState + emojiData.emoji);
  };
  return (
    <div className="flex flex-col w-3/4 h-screen bg-gray-700 bg-center">
      <Header username={username} />
      <Chats />
      <Input
        input={input}
        setInput={setInput}
        open={open}
        setOpen={setOpen}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
};

export default Room;
