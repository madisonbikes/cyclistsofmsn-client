import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./styles.css";
import { PostList } from "./components/PostList";
import { Logout } from "./components/Logout";
import { Info } from "./components/Info";
import { Main } from "./components/Main";
import { Login } from "./components/forms/Login";
import { Current } from "./components/Current";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Current />} />
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
