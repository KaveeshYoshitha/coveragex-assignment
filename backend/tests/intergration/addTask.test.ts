import {it, describe, expect, afterAll, beforeAll} from 'vitest';
import request from 'supertest';
import app from '../../server.js';
import pool from '../../config/db.js';


beforeAll(async ()=>{
    await pool.query("DELETE FROM tasks");
});

afterAll(async ()=>{
    await pool.end();
});


describe("Intergration test", ()=>{

    //Add Task API
    describe("Test the add task functioanality", ()=>{
        it("should add a task ", async ()=>{
            //Arrange
            const endpoint = "/api/tasks/addtask";
            const newTask = { title: "Test Task", description: "This is a test task" };

            //Act
            const res = await request(app as any).post(endpoint).send(newTask);

            //Assert
            expect(res.status).toBe(201)
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                title: newTask.title,
                description: newTask.description,
                is_done: 0,
                created_at: expect.any(String)
            })

        } );

        it("should return 400 if title is missing", async()=>{

            const endpoint = "/api/tasks/addtask";
            const newTask = { title: "", description: "This is a test task" };

            const res = await request(app as any).post(endpoint).send(newTask);

            expect(res.status).toBe(400);
            expect(res.body).toMatchObject({
                message: "Title and description are required"
            });
        });

        it("should return 400 if description is missing", async()=>{

            const endpoint = "/api/tasks/addtask";
            const newTask = { title: "Test Task", description: "" };

            const res = await request(app as any).post(endpoint).send(newTask);

            expect(res.status).toBe(400);
            expect(res.body).toMatchObject({
                message: "Title and description are required"
            });
        });

    });

    //Get Task API
    describe("Test the get tasks functionality", ()=>{
        it("should get all tasks", async ()=>{
            const endpoint = "/api/tasks/getalltasks";

            //Add 6 tasks
            for(let i=1; i<=6; i++){
                await pool.query("INSERT INTO tasks (title, description, is_done, created_at) VALUES (?, ?, false, NOW())", [`Task ${i}`, `This is task number ${i}`]);
            }
            const res = await request(app as any).get(endpoint);
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(7);;
            console.log("")
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                is_done: 0,
                created_at: expect.any(String)
            });
        });


        it("should get last 5 tasks that are not done", async ()=>{
            const endpoint = "/api/tasks/gettasks";
            const res = await request(app as any).get(endpoint);
            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBe(5);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                is_done: 0,
                created_at: expect.any(String)
            });
        });
    });

   // PUT Task Api
describe("Test the put task functionality", () => {
  it("should update a task to done", async () => {
    const createRes = await request(app as any)
      .post("/api/tasks/addtask")
      .send({ title: "Update Me", description: "Mark as done" });

    expect(createRes.status).toBe(201);
    const id = createRes.body.id;

    const endpoint = `/api/tasks/${id}/updatetask`; 
    const res = await request(app as any).put(endpoint);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      message: "Task marked as done",
    });
  });

  it("should return 404 if task not found", async () => {
    const endpoint = "/api/tasks/999/updatetask";
    const res = await request(app as any).put(endpoint);
    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      message: "Task not found",
    });
  });
});

});
