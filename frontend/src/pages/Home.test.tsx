import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Mock apiService before importing the component under test
vi.mock("../services/api", () => ({
    default: {
        getTasks: vi.fn(),
        addTask: vi.fn(),
    },
}));

// Mock react-toastify before importing the component
vi.mock("react-toastify", () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn(),
        warning: vi.fn(),
    },
    ToastContainer: () => <div data-testid="toast-container" />,
}));

import Home from "./Home";
import apiService from "../services/api";
import { toast } from "react-toastify";

const mockTasks = [
    { id: "1", title: "Task 1", description: "Desc 1" },
    { id: "2", title: "Task 2", description: "Desc 2" },
];

describe("Home Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        // cleanup the DOM between tests to avoid multiple rendered copies
        document.body.innerHTML = "";
    });

    it("renders form and tasks", async () => {
        (apiService.getTasks as any).mockResolvedValueOnce(mockTasks);
        render(<Home />);
        expect(screen.getByText("Add a Task")).not.toBeNull();
        await waitFor(() => {
            expect(screen.getByText("Task 1")).not.toBeNull();
            expect(screen.getByText("Task 2")).not.toBeNull();
        });
    });

    it("shows 'No Tasks Available.' when no tasks", async () => {
        (apiService.getTasks as any).mockResolvedValueOnce([]);
        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText("No Tasks Available.")).not.toBeNull();
        });
    });

    it("shows error toast if getTasks fails", async () => {
        (apiService.getTasks as any).mockRejectedValueOnce(new Error("fail"));
        render(<Home />);
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Error loading tasks");
        });
    });

    it("shows warning toast if form is incomplete", async () => {
        (apiService.getTasks as any).mockResolvedValueOnce([]);
        render(<Home />);
        const titleInput = await screen.findByPlaceholderText(/Title/i);
        const descInput = await screen.findByPlaceholderText(/Description/i);
        fireEvent.change(titleInput, { target: { value: "" } });
        fireEvent.change(descInput, { target: { value: "" } });
        fireEvent.click(screen.getByText("Add"));
        await waitFor(() => {
            expect(toast.warning).toHaveBeenCalledWith("Please fill in all fields");
        });
    });

    it("submits form and adds task", async () => {
    // ensure getTasks returns [] initially and then returns the new task after add
    (apiService.getTasks as any).mockResolvedValueOnce([]).mockResolvedValueOnce([{ id: "3", title: "New Task", description: "New Desc" }]);
    (apiService.addTask as any).mockResolvedValueOnce({ id: "3", title: "New Task", description: "New Desc" });
        render(<Home />);
        const titleInput = await screen.findByPlaceholderText(/Title/i);
        const descInput = await screen.findByPlaceholderText(/Description/i);
        fireEvent.change(titleInput, { target: { value: "New Task" } });
        fireEvent.change(descInput, { target: { value: "New Desc" } });
        fireEvent.click(screen.getByText("Add"));
        await waitFor(() => {
            expect(apiService.addTask).toHaveBeenCalledWith({ id: "", title: "New Task", description: "New Desc" });
            expect(toast.success).toHaveBeenCalledWith("Task added successfully");
        });
    });

    it("shows error toast if addTask fails", async () => {
        (apiService.getTasks as any).mockResolvedValueOnce([]);
        (apiService.addTask as any).mockRejectedValueOnce(new Error("fail"));
        render(<Home />);
        const titleInput = await screen.findByPlaceholderText(/Title/i);
        const descInput = await screen.findByPlaceholderText(/Description/i);
        fireEvent.change(titleInput, { target: { value: "New Task" } });
        fireEvent.change(descInput, { target: { value: "New Desc" } });
        fireEvent.click(screen.getByText("Add"));
        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Error adding task");
        });
    });
});
