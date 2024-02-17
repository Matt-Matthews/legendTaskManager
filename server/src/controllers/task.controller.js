import {createTask, getAllTasks, getAllTeamTasks} from '../models/task.model.js'

const httpGetAllUserTasks = (req, res) => {

    const tasks = getAllTasks({userId: req.param.id});
    
    return res.status(200).json(tasks);
}

const httpGetAllTeamTasks = (req, res) => {

    const tasks = getAllTasks({teamId: req.param.id});
    
    return res.status(200).json(tasks);
}

const httpAddNewTask = (req, res) => {
    const status = createTask(req.body);
    if(status === 'success') return res.status(201).json({
        status
    });

    return res.status(401).json({
        status
    });
}

export {
    httpGetAllUserTasks,
    httpAddNewTask,
    httpGetAllTeamTasks
}