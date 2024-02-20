import { verifyToken } from "../helpers/jwt.helper.js";
import {
  assignTask,
  createTask,
  getAllTasks,
  updateTask,
  getTask,
  getAllTeamTasks
} from "../models/task.model.js";
import { handleID } from "../helpers/db.helper.js";

const httpGetAllUserTasks = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);
    //get all tasks where there is no team assigned
    const tasks = await getAllTasks(user.id, req.query);

    if (!tasks) {
      return res.status(404).json("tasks not found");
    }

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
const httpGetTask = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);
    //get all tasks where there is no team assigned
    const task = await getTask(user.id, req.params.taskId);

    if (!task) {
      return res.status(404).json("tasks not found");
    }

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const httpGetAllTeamTasks = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);

    //get all tasks where the user is either a team member or an owner with a team
    //teamId should not be null in both cases

    const tasks = await getAllTeamTasks(user.id, req.query);

    if (!tasks) {
      return res.status(404).json("tasks not found");
    }

    return res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const httpAddNewTask = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);

    const results = await createTask(req.body, user.id);
    if (!results) {
      return res.status(401).json("Not permitted");
    }
    return res.status(201).json({
      results,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const httpAssignTask = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);

    const results = await assignTask(
      user.id,
      req.params.taskId,
      req.body.teamId
    );

    if (!results) {
      return res.status(404).json("task not found");
    }

    return res.status(201).json({
      results,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const httpUpdateTask = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);

    const results = await updateTask(user.id, req.params.taskId, req.body);

    return res.status(201).json({
      results,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export {
  httpGetAllUserTasks,
  httpAddNewTask,
  httpGetAllTeamTasks,
  httpAssignTask,
  httpUpdateTask,
  httpGetTask,
};
