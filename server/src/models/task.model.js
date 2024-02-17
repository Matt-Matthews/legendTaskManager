import { v4 as uuid } from 'uuid'
import Task from "../schemas/task.schema.js";

const createTask = async (task) => {
  const _task = await Task({...task, taskId: uuid()});
  try {
    await _task.save();
    return 'success';
  }catch(err){
    console.log(err.message);
    return err.message;
  }
};

const getAllTasks = async (id) => {
  try{
    const tasks = await Task.find({...id});
    return tasks;
  }catch(err){
    return err.message;
  }

}


export {
    createTask,
    getAllTasks,
}