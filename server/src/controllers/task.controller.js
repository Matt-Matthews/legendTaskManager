import { verifyToken } from '../helpers/jwt.helper.js';
import {createTask, getAllTasks } from '../models/task.model.js'
import { handleID } from '../helpers/db.helper.js';

const httpGetAllUserTasks = async (req, res) => {

    const user = verifyToken(req.headers["authorization"]);
    console.log(user);
    const tasks = await getAllTasks({owner: handleID(user.id)});
    
    return res.status(200).json(tasks);
}

const httpGetAllTeamTasks = (req, res) => {

    const tasks = getAllTasks({teamId: handleID(req.params.id)});
    
    return res.status(200).json(tasks);
}

const httpAddNewTask = async (req, res) => {
    const user = verifyToken(req.headers["authorization"]);
    console.log(user);
    const status = await createTask(req.body, user.id);
    if(status !== 'success') 
    {
        return res.status(401).json({
            status
        });
    }
    return res.status(201).json({
        status
    });

}

export {
    httpGetAllUserTasks,
    httpAddNewTask,
    httpGetAllTeamTasks
}