import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export const LoginButton = (): JSX.Element => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading || isAuthenticated) return <></>;

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};
