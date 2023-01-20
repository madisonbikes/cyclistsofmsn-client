import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { PostList } from "./components/PostList";
import "./styles.css";
import Logout from "./components/Logout";
import Info from "./components/Info";
import Main from "./components/Main";
import Login from "./components/forms/Login";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="posts" element={<Outlet />}>
            <Route index element={<PostList />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
