import Link from "next/link";
import React from "react";
import { FaEllipsisH } from "react-icons/fa";

interface Props {
  tasks: TaskList;
  editTask: Function
}

interface TaskList {
  currentPage: number;
  tasks: Array<Task>;
  totalPages: number;
  totalTasks: number;
 
}

interface Task {
  createdAt: Date;
  description: string;
  dueDate: Date;
  isArchived: boolean;
  name: string;
  notes: any;
  owner: string;
  status: string;
  teamId: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

function TaskTable({ tasks, editTask }: Props) {

  return (
    <div className=" mt-3">
      {tasks?.totalTasks > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.tasks.map((task) => {
              return (
                <tr key={task._id}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>{task.dueDate?.toString().split('T')[0]}</td>
                  <td>
                    <button className="dropdown dropdown-end">
                      <FaEllipsisH />
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li>
                          <Link href="#" onClick={()=>editTask(task._id, 'edit')}>Edit</Link>
                        </li>
                        <li>
                          <Link href={`/dashboard/task?id=${task._id}`}>View Details</Link>
                        </li>
                      </ul>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No tasks</div>
      )}
      <div className="flex items-center justify-center mt-5">
        <div className="join">
          <button className="join-item btn" disabled={tasks?.totalPages <= 1}>
            «
          </button>
          <button className="join-item btn">Page {tasks?.currentPage}</button>
          <button className="join-item btn" disabled={tasks?.totalPages <= 1}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskTable;
