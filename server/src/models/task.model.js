import Task from "../schemas/task.schema.js";
import { handleID } from "../helpers/db.helper.js";

const createTask = async (task, userId) => {
  const _task = await Task({ ...task, owner: handleID(userId) });
  const results = await _task.save();
  return results;
};

const getAllTasks = async (id) => {
  //id is object which could be {owner: 'ownerId'} or {teamId: 'teamID'}, this function is reuseable.
  const tasks = await Task.find(id);

  return tasks;
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

export { createTask, getAllTasks, assignTask, updateTask };
