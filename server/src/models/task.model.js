import { v4 as uuid } from 'uuid'
import Task from "../schemas/task.schema.js";

const createTask = async () => {
  const _task = await Task({
    taskId: uuid(),
    taskName: "Website redesign",
    description: "Redesign the company website to improve user experience",
    date: Date.now(),
    status: "saved",
  });
  try {
    await _task.save();
    console.log('data posted');
  }catch(err){
    console.log(err.message);
  }
};

export {
    createTask
}