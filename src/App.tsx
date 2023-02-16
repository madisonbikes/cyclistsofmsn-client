import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./styles.css";
import { PostList } from "./components/PostList";
import { Logout } from "./components/security/Logout";
import { Info } from "./components/security/Info";
import { Main } from "./components/Main";
import { Login } from "./components/forms/Login";
import { Current } from "./components/Current";
import { ImageList } from "./components/ImageList";
import { ImageDetail } from "./components/ImageDetail";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./common";
import { PostDetail } from "./components/PostDetail";

export const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Current />} />
            <Route path="posts" element={<Outlet />}>
              <Route index element={<PostList />} />
              <Route path=":id" element={<PostDetail />} />
            </Route>
            <Route path="images" element={<Outlet />}>
              <Route index element={<ImageList />} />
              <Route path=":id" element={<ImageDetail />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="info" element={<Info />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
