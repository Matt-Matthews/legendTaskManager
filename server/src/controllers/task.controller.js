import { verifyToken } from "../helpers/jwt.helper.js";
import {
  assignTask,
  createTask,
  getAllTasks,
  updateTask,
} from "../models/task.model.js";
import { handleID } from "../helpers/db.helper.js";

const httpGetAllUserTasks = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);
    //get all tasks where there is no team assigned
    const tasks = await getAllTasks({ owner: handleID(user.id), teamId: null }, req.query);

    if (!tasks) {
      return res.status(404).send("tasks not found");
    }

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const httpGetAllTeamTasks = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);

    //get all tasks where the user is either a team member or an owner with a team
    //teamId should not be null in both cases

    const tasks = await getAllTasks({
      $or: [
        { teamId: handleID(req.body.teamId) },
        { owner: handleID(user.id), teamId: { $ne: null } },
      ],
    }, req.query);

    if (!tasks) {
      return res.status(404).send("tasks not found");
    }

    return res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const httpAddNewTask = async (req, res) => {
  try {
    const user = verifyToken(req.headers["authorization"]);

    const results = await createTask(req.body, user.id);
    if (!results) {
      return res.status(401).send("Not permitted");
    }
    return res.status(201).json({
      results,
    });
  } catch (err) {
    res.status(500).send(err.message);
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
      return res.status(404).send("task not found");
    }

    return res.status(201).json({
      results,
    });
  } catch (err) {
    res.status(500).send(err.message);
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
    res.status(500).send(err.message);
  }
};

export {
  httpGetAllUserTasks,
  httpAddNewTask,
  httpGetAllTeamTasks,
  httpAssignTask,
  httpUpdateTask,
};
