import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Layout from "./components/Layout";
import ChatList from "./page/ChatList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat-list" element={<ChatList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
