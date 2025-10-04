import pool from '../config/db.js';

//Add a task
export const addTask = async(title, description) => {
    const [result] = await pool.query("INSERT INTO tasks (title, description, is_done, created_at) VALUES (?, ?, false, NOW())", [title, description]);

    return {id: result.insertId, title, description, is_done: 0, created_at: new Date()};
}

//Get last 5 tasks that are not done
export const getLastTasks = async() => {
    const [rows] = await pool.query("SELECT * FROM tasks where is_done = false ORDER BY created_at DESC LIMIT 5");
    return rows;
}


//Get all tasks
export const getAllTasks = async() => {
    const [rows] = await pool.query("SELECT * FROM tasks where is_done = false ORDER BY created_at DESC");
    return rows;
}

//Mark a task as done
export const markTaskDone = async(id) => {
    await pool.query("UPDATE tasks SET is_done = true WHERE id = ?", [id]);
    return {id};
}

