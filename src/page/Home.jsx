import axios from "axios";
import { useEffect, useState } from "react";
import { TbRobot } from "react-icons/tb";
import ChatlistCard from "../components/ChatlistCard";

const Home = () => {
  const [content, setContent] = useState("");
  const [chatlist, setChatlist] = useState([]);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      if (!content) return;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      setChatlist([
        {
          question: content,
          answer: response.data.choices[0].message.content,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(chatlist);
  }, [chatlist]);

  return (
    <div className="mt-8 flex flex-col justify-center">
      <form
        className="flex justify-center items-center"
        onSubmit={onSubmitChat}
      >
        <input
          className="text-2xl p-2 focus:outline-none rounded-lg border-2 border-orange-200 focus:border-orange-400"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="ml-4 flex justify-center items-center bg-orange-200 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-orange-300 hover:bg-orange-300"
          type="submit"
        >
          <TbRobot /> 검색
        </button>
      </form>
      <ul>
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={i.answer} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
