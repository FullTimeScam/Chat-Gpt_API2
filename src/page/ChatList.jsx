import { useEffect, useState } from "react";
import ChatlistCard from "../components/ChatlistCard";

const ChatList = () => {
  const [chatlist, setChatlist] = useState([]);

  useEffect(() => {
    const savedChatlist = localStorage.getItem("savedChatlist");

    if (!savedChatlist) return;

    setChatlist(JSON.parse(savedChatlist));
  }, []);
  return (
    <div>
      <ul>
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={v.answer} />
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
