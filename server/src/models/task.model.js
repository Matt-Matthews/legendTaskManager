import Task from "../schemas/task.schema.js";
import { handleID } from "../helpers/db.helper.js";

const createTask = async (task, userId) => {
  try {
    const _task = await Task({...task, owner: handleID(userId)});
    await _task.save();
    return 'success';
  }catch(err){
    console.log(err.message);
    return err.message;
  }
};

const getAllTasks = async (id) => {
  try{
    console.log(id);
    const tasks = await Task.find(id);
    console.log('tesks',tasks);
    return tasks;
  }catch(err){
    return err.message;
  }

}


export {
    createTask,
    getAllTasks,
}