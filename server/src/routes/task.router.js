import express from 'express';
import {httpGetAllUserTasks, httpAddNewTask, httpGetAllTeamTasks } from '../controllers/task.controller.js';

const taskRouter = express.Router();

taskRouter.get('/user', httpGetAllUserTasks);
taskRouter.get('/team', httpGetAllTeamTasks);
taskRouter.post('/', httpAddNewTask);
taskRouter.put('/')

export default taskRouter;