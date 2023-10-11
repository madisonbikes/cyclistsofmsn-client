import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";

jest.mock("./api/posts");
jest.mock("./api/images");
jest.mock("./common", () => ({
  useAuth: () => {
    return {
      state: { authenticated: true },
      setState: () => {
        return undefined;
      },
    };
  },
  useWindowDimensions: () => {
    return { width: 1000, height: 1000 };
  },
}));
const queryClient = new QueryClient();

test("renders a photo from cyclists of madison", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );

  // waits for loading screen to pass
  await waitFor(() => {
    expect(screen.getByAltText("cyclist")).toBeDefined();
  });

  const previousButton = screen.getByRole("button", {
    name: /previous photo/i,
  });

  // click previous once
  fireEvent.click(previousButton);
  await waitFor(() => {
    expect(screen.getByRole("button", { name: /next photo/i })).toBeDefined();
  });

  // twice
  fireEvent.click(previousButton);
  await waitFor(() => {
    expect(screen.getByRole("button", { name: /next photo/i })).toBeDefined();
  });

  // now at start of list of three posts
  expect(screen.queryByRole("button", { name: /previous photo/i })).toBeNull();
});
