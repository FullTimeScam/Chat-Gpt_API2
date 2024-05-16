const ChatlistCard = ({ question, answer }) => {
  return (
    <li className="mt-8 px-4 bg-orange-50 p-4 rounded-md text-md">
      <div className="mb-2 font-semibold flex flex-col gap-4">
        Q. {question}
      </div>
      <div className="border-4 border-orange-300 p-4">A. {answer}</div>
    </li>
  );
};

export default ChatlistCard;
