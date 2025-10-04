import { describe, it, expect, vi, beforeEach } from "vitest";
import httpMocks from "node-mocks-http";

import {
  addTaskController,
  getLastTasksController,
  getAllTasksController,
  updateTaskController,
} from "../../controllers/taskController.js";

// Mock all model functions
import * as taskModel from "../../models/taskModel.js";
vi.mock("../../models/taskModel.js");

describe("Task Controller Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("addTaskController - should return 400 if title/description missing", async () => {
    const req = httpMocks.createRequest({ body: { title: "", description: "" } });
    const res = httpMocks.createResponse();

    await addTaskController(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({
      message: "Title and description are required",
    });
  });

  it("addTaskController - should call model and return 201", async () => {
    const req = httpMocks.createRequest({
      body: { title: "T", description: "D" },
    });
    const res = httpMocks.createResponse();

    const mockTask = { id: 1, title: "T", description: "D" };
    vi.spyOn(taskModel, "addTask").mockResolvedValue(mockTask);

    await addTaskController(req, res);

    expect(taskModel.addTask).toHaveBeenCalledWith("T", "D");
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual(mockTask);
  });

  it("getLastTasksController - should return 200 and tasks", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    const tasks = [{ id: 1, title: "A" }];
    vi.spyOn(taskModel, "getLastTasks").mockResolvedValue(tasks);

    await getLastTasksController(req, res);

    expect(taskModel.getLastTasks).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(tasks);
  });

  it("getAllTasksController - should return 200 and all tasks", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    const tasks = [{ id: 1, title: "B" }];
    vi.spyOn(taskModel, "getAllTasks").mockResolvedValue(tasks);

    await getAllTasksController(req, res);

    expect(taskModel.getAllTasks).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(tasks);
  });

  it("updateTaskController - should return 400 if id missing", async () => {
    const req = httpMocks.createRequest({ params: {} });
    const res = httpMocks.createResponse();

    await updateTaskController(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toEqual({ message: "Task ID is required" });
  });

  it("updateTaskController - should return 404 if task not found", async () => {
    const req = httpMocks.createRequest({ params: { id: "99" } });
    const res = httpMocks.createResponse();

    vi.spyOn(taskModel, "getAllTasks").mockResolvedValue([]);

    await updateTaskController(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toEqual({ message: "Task not found" });
  });

  it("updateTaskController - should mark task as done", async () => {
    const req = httpMocks.createRequest({ params: { id: "10" } });
    const res = httpMocks.createResponse();

    vi.spyOn(taskModel, "getAllTasks").mockResolvedValue([{ id: 10 }]);
    vi.spyOn(taskModel, "markTaskDone").mockResolvedValue({ id: 10 });

    await updateTaskController(req, res);

    expect(taskModel.markTaskDone).toHaveBeenCalledWith("10");
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual({ message: "Task marked as done" });
  });
});
