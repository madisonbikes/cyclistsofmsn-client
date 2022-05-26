import "./index.css";
import { App } from "./App";
import "@fontsource/roboto";
import { Auth0Provider } from "@auth0/auth0-react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(
  <StrictMode>
    <Auth0Provider
      domain="db122.us.auth0.com"
      clientId="h9L21cuV9NtpRaeWkncuEhhEHCwq6E8e"
      redirectUri={window.location.origin}
      audience={"https://cyclists_of_msn/api"}
      scope={"create:post"}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
