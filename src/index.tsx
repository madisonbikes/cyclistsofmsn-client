import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AuthProvider, theme, ErrorFallback } from "./common";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  </ThemeProvider>,
);
