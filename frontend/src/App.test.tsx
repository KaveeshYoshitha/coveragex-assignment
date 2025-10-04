import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "./App";

vi.mock("./pages/Home", () => ({
  default: () => <div>Home Page Mock</div>,
}));

describe("App Component", () => {
  it("renders Home page when visiting '/'", () => {
    render(<App />);
    expect(screen.queryByText("Home Page Mock")).not.toBeNull();
  });
});
