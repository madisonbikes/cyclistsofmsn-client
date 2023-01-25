import { Button } from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { logout, LogoutResponse } from "../api/logout";
import { useAuth } from "../common";

export const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation<LogoutResponse, Error, unknown>(logout);

  const handleLogout = () => {
    console.log("clearing authentication");
    auth.setState({ authenticated: false });
    logoutMutation.mutate(undefined);
    navigate("/");
  };

  return (
    <main>
      <h2>Logout</h2>
      <Button variant="contained" onClick={() => handleLogout()}>
        Logout
      </Button>
    </main>
  );
};
