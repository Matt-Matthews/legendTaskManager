import { verifyToken } from "../helpers/jwt.helper.js";
import { createTask, getAllTasks, updateTask } from "../models/task.model.js";
import { handleID } from "../helpers/db.helper.js";

const httpGetAllUserTasks = async (req, res) => {
  const user = verifyToken(req.headers["authorization"]);
  //get all tasks where there is no team assigned
  const tasks = await getAllTasks({ owner: handleID(user.id), teamId: null });

  return res.status(200).json(tasks);
};

const httpGetAllTeamTasks = (req, res) => {
  const user = verifyToken(req.headers["authorization"]);

  //get all tasks where the user is either a team member or an owner with a team
  //teamId should not be null in both cases
  const tasks = getAllTasks({
    $or: [
      { teamId: handleID(req.params.id) },
      { owner: handleID(user.id), teamId: { $ne: null } },
    ],
  });

  return res.status(200).json(tasks);
};

const httpAddNewTask = async (req, res) => {
  const user = verifyToken(req.headers["authorization"]);

  const status = await createTask(req.body, user.id);
  if (status !== "success") {
    return res.status(401).json({
      status,
    });
  }
  return res.status(201).json({
    status,
  });
};

const httpAssignTask = async (req, res) => {
  const user = verifyToken(req.headers["authorization"]);
  const results = await assignTask(user.id, ...req.body);

  return res.status(201).json({
    results,
  });
};

const httpUpdateTask = async (req, res) => {
    const user = verifyToken(req.headers["authorization"]);
    
    const results = await updateTask(user.id, req.body);

    return res.status(201).json({
        results,
    });
}

export {
  httpGetAllUserTasks,
  httpAddNewTask,
  httpGetAllTeamTasks,
  httpAssignTask,
  httpUpdateTask
};
