import Task from "../schemas/task.schema.js";
import { handleID } from "../helpers/db.helper.js";
import { calculateTotalPages } from "../helpers/page.helper.js";
import { getTeams } from "./team.model.js";

const createTask = async (task, userId) => {
  const _task = await Task({ ...task, owner: handleID(userId) });
  const results = await _task.save();
  return results;
};

const getAllTasks = async (userId, { limit, page }) => {
  const query = { owner: handleID(userId), teamId: null };
  const totalTasks = await Task.countDocuments(query);

  const totalPages = calculateTotalPages(totalTasks, limit);
  const skip = (page - 1) * limit;
  //add pagenation to the data that will be returned
  const tasks = await Task.find(query).skip(skip).limit(limit);

  return {
    totalTasks,
    totalPages,
    currentPage: Number(page),
    tasks,
  };
};

const getAllTeamTasks = async (userId, { limit, page }) => {
  //query is object which could be {owner: 'ownerId'} or {teamId: 'teamID'}.

  const teams = await getTeams(userId);
  const teamIds = [];
  if (teams.length > 0) {
    for (const team of teams) {
      teamIds.push(handleID(team._id));
    }
  }

  const query = {
    $or: [
      { teamId: {$in: teamIds} },
      { owner: handleID(userId), teamId: { $ne: null } },
    ],
  };

  const totalTasks = await Task.countDocuments(query);
  
  const totalPages = calculateTotalPages(totalTasks, limit);
  const skip = (page - 1) * limit;
  //add pagenation to the data that will be returned
  const tasks = await Task.find(query).skip(skip).limit(limit);

  return {
    totalTasks,
    totalPages,
    currentPage: Number(page),
    tasks,
  };
};

const getTask = async (userId, taskId) => {

  const teams = await getTeams(userId);
  const teamIds = [];
  if (teams.length > 0) {
    for (const team of teams) {
      teamIds.push(handleID(team._id));
    }
  }
  ////{ owner: handleID(user.id), _id: handleID(req.params.taskId) }
  const query = {$or: [
        { owner: handleID(userId), _id: handleID(taskId) },
        { _id: handleID(taskId), teamId: {$in: teamIds} },
      ],}
  const task = await Task.findOne(query);

  return task;
};

const assignTask = async (ownerId, taskId, teamId) => {
  const task = await Task.findOne({ _id: handleID(taskId), owner: ownerId });
  //only assign a team if the user is the owner of the task
  if (!task) return null;

  const results = await Task.updateOne({ _id: handleID(taskId) }, { teamId });
  return results;
};

const updateTask = async (userId, taskId, data) => {
  const results = await Task.updateOne(
    {
      _id: handleID(taskId),
      $or: [{ owner: handleID(userId) }, { teamId: data.teamId }],
    },
    data
  );
  //user can update if they are the owner or team member working on the task
  return results;
};

export { createTask, getAllTasks, assignTask, updateTask, getTask, getAllTeamTasks };
