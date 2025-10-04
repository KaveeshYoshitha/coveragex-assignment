import express from 'express';
import {addTaskController, getLastTasksController, getAllTasksController, updateTaskController} from '../controllers/taskController.js';

const router = express.Router();

router.post('/addtask', addTaskController);
router.get('/gettasks', getLastTasksController);
router.get('/getalltasks', getAllTasksController);
router.put('/:id/updatetask', updateTaskController);

export default router;