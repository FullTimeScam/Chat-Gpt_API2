import axios from "axios";
import { useEffect, useState } from "react";
import { TbRobot } from "react-icons/tb";
import ChatlistCard from "../components/ChatlistCard";

const Home = () => {
  const [content, setContent] = useState("");
  const [chatlist, setChatlist] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const savedChatlist = localStorage.getItem("savedChatlist");
    if (savedChatlist) {
      setChatlist(JSON.parse(savedChatlist));
    }
  }, []);

  const onSubmitChat = async (e) => {
    try {
      e.preventDefault();

      setLoading(true); // 로딩 시작

      if (!content) return;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          // model: "gpt-3.5-turbo",
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

      const newChat = {
        question: content,
        answer: response.data.choices[0].message.content,
      };

      // 1. 기존 로컬스토리지를 불러온다 / 그리고 문자열을 배열화한다.(parse)
      // if) 기존 로컬스토리지가 없다면 새 배열 생성
      // 2.  기존 or 새 배열에 newChat 추가
      // 3. 배열을 문자열 화 해서 저장

      let savedChatlist = localStorage.getItem("savedChatlist");

      if (!savedChatlist) {
        savedChatlist = [];
      } else {
        savedChatlist = JSON.parse(savedChatlist);
      }

      savedChatlist.push(newChat);

      localStorage.setItem("savedChatlist", JSON.stringify(savedChatlist));

      setLoading(false); // 로딩이 끝났다

      setChatlist([newChat, ...chatlist]);
      setContent(""); // 입력칸 비우기
    } catch (error) {
      console.error(error);

      setLoading(ture); //에러가 떴을 때 다시 로딩중으로 돌아가기
    }
  };

  const killHistory = () => {
    localStorage.removeItem("savedChatlist");
    setChatlist([]);
  };

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
          disabled={isLoading}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="ml-4 flex justify-center items-center bg-orange-200 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-orange-300 hover:bg-orange-300"
          type="submit"
        >
          {isLoading ? <TbRobot className="animate-spin" /> : <TbRobot />}
          검색
        </button>
        <button
          type="button"
          onClick={killHistory}
          className="ml-4 flex justify-center items-center bg-orange-200 text-2xl px-4 py-[10px] rounded-full shadow-md shadow-orange-300 hover:bg-orange-300"
        >
          기록 삭제
        </button>
      </form>
      <ul>
        {chatlist.map((v, i) => (
          <ChatlistCard key={i} question={v.question} answer={v.answer} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
