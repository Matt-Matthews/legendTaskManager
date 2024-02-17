import {createTask} from '../models/task.model.js'

const getAllUserTasks = (req, res) => {
    const status = createTask();
    return res.status(200).json({
        name: 'test',
        description: 'This is a describtion',
        date: '12 may 2024',
        status
    });
}

const addNewTask = (req, res) => {
    return res.status(201);
}

export {
    getAllUserTasks,
    addNewTask,
}