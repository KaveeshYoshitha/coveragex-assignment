import { describe, it, expect, vi, beforeEach } from "vitest";
import pool from "../../config/db.js";
import { addTask, getLastTasks, getAllTasks, markTaskDone } from "../../models/taskModel.js";

vi.mock("../../config/db.js");

describe("Task Model Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add a new task", async () => {
    // Mock DB response
    const mockResult = [{ insertId: 123 }];
    (pool.query as any).mockResolvedValue(mockResult);

    const task = await addTask("Title", "Description");

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO tasks (title, description, is_done, created_at) VALUES (?, ?, false, NOW())",
      ["Title", "Description"]
    );
    expect(task).toMatchObject({
      id: 123,
      title: "Title",
      description: "Description",
      is_done: 0,
    });
  });

  it("should get last 5 tasks", async () => {
    const mockRows = [[{ id: 1, title: "T", is_done: 0 }]];
    (pool.query as any).mockResolvedValue(mockRows);

    const result = await getLastTasks();

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM tasks where is_done = false ORDER BY created_at DESC LIMIT 5"
    );
    expect(result).toEqual(mockRows[0]);
  });

  it("should get all tasks", async () => {
    const mockRows = [[{ id: 2, title: "A" }]];
    (pool.query as any).mockResolvedValue(mockRows);

    const result = await getAllTasks();

    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM tasks where is_done = false ORDER BY created_at DESC"
    );
    expect(result).toEqual(mockRows[0]);
  });

  it("should mark a task as done", async () => {
    (pool.query as any).mockResolvedValue([{}]);
    const result = await markTaskDone(10);

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE tasks SET is_done = true WHERE id = ?",
      [10]
    );
    expect(result).toEqual({ id: 10 });
  });
});
