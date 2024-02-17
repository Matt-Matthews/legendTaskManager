import express from 'express';
import {getAllUserTasks, addNewTask} from '../controllers/task.controller.js';

const taskRouter = express.Router();

taskRouter.get('/', getAllUserTasks);
taskRouter.post('/', addNewTask);

export default taskRouter;