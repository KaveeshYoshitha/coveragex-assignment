import { describe, it, expect, vi, beforeEach } from "vitest";


var mockGet;
var mockPost;
var mockPut;

vi.mock("axios", () => {
  mockGet = vi.fn();
  mockPost = vi.fn();
  mockPut = vi.fn();

  return {
    default: {
      create: vi.fn(() => ({
        get: mockGet,
        post: mockPost,
        put: mockPut,
      })),
    },
  };
});

import apiService from "./api";

describe("apiService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getTasks should fetch last 5 tasks", async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await apiService.getTasks();
    expect(mockGet).toHaveBeenCalledWith("/gettasks");
    expect(result).toBe(mockData);
  });

  it("getAllTasks should fetch all tasks", async () => {
    const mockData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await apiService.getAllTasks();
    expect(mockGet).toHaveBeenCalledWith("/getalltasks");
    expect(result).toBe(mockData);
  });

  it("addTask should post a new task", async () => {
    const newTask = { title: "Test Task" };
    const mockResponse = { id: 1, ...newTask };
    mockPost.mockResolvedValueOnce({ data: mockResponse });

    const result = await apiService.addTask(newTask);
    expect(mockPost).toHaveBeenCalledWith("/addtask", newTask);
    expect(result).toBe(mockResponse);
  });

  it("updateTask should put update for a task", async () => {
    const id = "123";
    const mockResponse = { id, title: "Updated Task" };
    mockPut.mockResolvedValueOnce({ data: mockResponse });

    const result = await apiService.updateTask(id);
    expect(mockPut).toHaveBeenCalledWith(`/${id}/updatetask`);
    expect(result).toBe(mockResponse);
  });
});
