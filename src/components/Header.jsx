import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <header className="px-2 flex justify-center gap-8 shadow-md">
      <Link
        className={`link-style ${
          location.pathname === "/" && "text-gray-900"
        }`} /* 경로를 찾아서 그 경로에 접속한 상태라면 이 스타일로 바꿈*/
        to="/"
      >
        질문하기
      </Link>
      <Link
        className={`link-style ${
          location.pathname === "/chat-list" && "text-gray-900"
        }`} /* 경로를 찾아서 그 경로에 접속한 상태라면 이 스타일로 바꿈*/
        to="chat-list"
      >
        내 질문 리스트
      </Link>
    </header>
  );
};

export default Header;
