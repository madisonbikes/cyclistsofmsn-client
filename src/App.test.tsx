import { render, screen, waitFor } from "@testing-library/react";
import { App } from "./App";

jest.mock("./api");

test("renders a photo from cyclists of madison", async () => {
  render(<App />);

  // waits for loading screen to pass
  await waitFor(() => {
    expect(screen.queryByRole("progressbar")).toBeNull();
  });

  expect(screen.getByRole("button", { name: /random photo/i })).toBeDefined();
  expect(screen.getByRole("button", { name: /next photo/i })).toBeDefined();
  expect(screen.getByRole("button", { name: /previous photo/i })).toBeDefined();
  expect(screen.getByAltText("cyclist")).toBeDefined();
});
