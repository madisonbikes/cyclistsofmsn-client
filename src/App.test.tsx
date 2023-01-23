import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";

jest.mock("./api/posts");
jest.mock("./common", () => ({
  useAuth: () => {
    return {
      state: { authenticated: true },
      setState: () => {
        return undefined;
      },
    };
  },
}));
const queryClient = new QueryClient();

test("renders a photo from cyclists of madison", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

  // waits for loading screen to pass
  await waitFor(() => {
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  expect(screen.getByRole("button", { name: /random photo/i })).toBeDefined();
  expect(screen.getByRole("button", { name: /next photo/i })).toBeDefined();
  expect(screen.getByRole("button", { name: /previous photo/i })).toBeDefined();
  expect(screen.getByAltText("cyclist")).toBeDefined();
});
