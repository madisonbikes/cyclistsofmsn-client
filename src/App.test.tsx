import { render, screen } from "@testing-library/react";
import { App } from "./App";
import React from "react";

test("renders Cyclists of Madison text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Cyclists of Madison/i);
  expect(linkElement).toBeInTheDocument();
});
