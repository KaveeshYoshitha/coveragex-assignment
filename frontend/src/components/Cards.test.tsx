import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

vi.mock("../services/api", () => ({
  default: {
    // create the mock inside the factory to avoid hoisting/init order issues
    updateTask: vi.fn(() => Promise.resolve({})),
  },
}));

import Card from "./Cards";

describe("Card Component unit test", () => {
  const mockTask = { id: "1", title: "Test Task", description: "Test Desc" };

  it("renders Card component with title and description", () => {
    render(<Card task={mockTask} onDelete={() => {}} />);
    expect(screen.getByText("Test Task")).not.toBeNull();
    expect(screen.getByText("Test Desc")).not.toBeNull();
  });

  it("calls handleUpdate when delete button is clicked", async () => {
    const onDeleteMock = vi.fn();
    render(<Card task={mockTask} onDelete={onDeleteMock} />);

    fireEvent.click(screen.getAllByRole("button", { name: /Done/i })[0]);

    // Ensure updateTask was called
    const api = (await vi.importMock("../services/api")) as any;
    await vi.waitFor(() => {
      expect(api.default.updateTask).toHaveBeenCalledWith("1");
    });
  });
});
