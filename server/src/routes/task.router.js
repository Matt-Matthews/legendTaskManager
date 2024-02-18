import express from 'express';
import {httpGetAllUserTasks, httpAddNewTask, httpGetAllTeamTasks, httpAssignTask, httpUpdateTask } from '../controllers/task.controller.js';

const taskRouter = express.Router();

taskRouter.get('/user', httpGetAllUserTasks);
taskRouter.get('/team', httpGetAllTeamTasks);
taskRouter.post('/', httpAddNewTask);
taskRouter.put('/team/:taskId', httpAssignTask);
taskRouter.put('/:taskId', httpUpdateTask);

export default taskRouter;