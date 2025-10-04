import { addTask, getLastTasks, getAllTasks, markTaskDone } from "../models/taskModel.js";

// add task controller

export const addTaskController = async (req, res) => {

    try{
        const {title, description} = req.body;

        if(!title || !description) {
            return res.status(400).json({message: "Title and description are required"});
        }

        const newTask = await addTask(title, description);
        res.status(201).json(newTask);

    }   catch (error) {
        res.status(500).json({message: error.message});
    }
    
};

// get last 5 tasks controller

export const getLastTasksController = async (req, res) => {
    try{
        const tasks = await getLastTasks();
        res.status(200).json(tasks);
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
}

// get all tasks controller
export const getAllTasksController = async (req, res) => {
    try{
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
}

// mark task as done controller
export const updateTaskController = async (req, res) => {
    try{
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({message: "Task ID is required"});
        }

        // Check if task exists
        const tasks = await getAllTasks();
        const task = tasks.find((t)=>(t.id == id));

        if(!task) {
            return res.status(404).json({message: "Task not found"});
        }

        await markTaskDone(id);
        res.status(200).json({message: "Task marked as done"});
    }   catch (error) {
        res.status(500).json({message: error.message});
    }
}