import { Link } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../common";
import { Copyright } from "./Copyright";

export const Main = () => {
  const auth = useAuth();

  return (
    <>
      <h1>Cyclists of Madison Administration</h1>
      <nav>
        <Link component={RouterLink} to="/">
          Home
        </Link>
        &nbsp;|&nbsp;
        {!auth.state.authenticated ? (
          <>
            <Link component={RouterLink} to="/login">
              Login
            </Link>
            &nbsp;|&nbsp;
          </>
        ) : null}
        {auth.state.authenticated ? (
          <>
            <Link component={RouterLink} to="/posts">
              Posts
            </Link>
            &nbsp;|&nbsp;
          </>
        ) : null}
        {auth.state.authenticated ? (
          <>
            <Link component={RouterLink} to="/logout">
              Logout
            </Link>
            &nbsp;|&nbsp;
          </>
        ) : null}
        <Link component={RouterLink} to="/info">
          Info
        </Link>
      </nav>
      <Outlet />
      <footer>
        <Copyright />
      </footer>
    </>
  );
};
