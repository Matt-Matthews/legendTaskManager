import express from 'express';
import {httpGetAllUserTasks, httpAddNewTask, httpGetAllTeamTasks } from '../controllers/task.controller.js';

const taskRouter = express.Router();

taskRouter.get('/user/:id', httpGetAllUserTasks);
taskRouter.get('/team/:id', httpGetAllTeamTasks);
taskRouter.post('/', httpAddNewTask);
taskRouter.put('/:id')

export default taskRouter;