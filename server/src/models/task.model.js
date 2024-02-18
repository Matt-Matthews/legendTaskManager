import Task from "../schemas/task.schema.js";
import { handleID } from "../helpers/db.helper.js";

const createTask = async (task, userId) => {
  try {

    const _task = await Task({ ...task, owner: handleID(userId) });
    await _task.save();
    return "success";

  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

const getAllTasks = async (id) => {
  try {
    //id is object which could be {owner: 'ownerId'} or {teamId: 'teamID'}, this function is reuseable.
    const tasks = await Task.find(id);
    return tasks;

  } catch (err) {
    return err.message;
  }
};

const assignTask = async (ownerId, taskId, teamId) => {
  try {
    const task = await Task.findOne({ _id: handleID(taskId), owner: ownerId });
    //only assign a team if the user is the owner of the task
    if (!task) return "not found";

    await Task.updateOne(id, { teamId });
    return "success";
  } catch (err) {
    return err.message;
  }
};

const updateTask = async (userId, data) => {
  try{
    const results = await Task.UpdateOne({_id: handleID(data.taskId),$or: [{owner: handleID(userId)}, {teamId: data.teamId}]});
    return results;
  }catch(err){
    return err.message
  }
}

export { createTask, getAllTasks, assignTask, updateTask };
