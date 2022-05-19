import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-ui/core";

export const LogoutButton = (): JSX.Element => {
  const { logout, isAuthenticated, isLoading } = useAuth0();
  if (isLoading || !isAuthenticated) return <></>;

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};