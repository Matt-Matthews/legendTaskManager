"use client";
import React from "react";
import TaskTable from "./TaskTable";
import AddTaskForm from "./AddTaskForm";
import { getTasks, getTeamTasks } from "../api/task";

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

function DashboardView() {
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const tabs = ["Individual", "Team"];
  const [isAddTask, setIsAddTask] = React.useState(false);
  const [userTasks, setUserTasks] = React.useState<TaskList>();
  const [teamTasks, setTeamTasks] = React.useState<TaskList>();
  const [taskId, setTaskId] = React.useState('');
  const [formAction, setFormAction] = React.useState('add');

  const handleEditTask = (id:string, action:string) =>{
    setTaskId(id);
    setFormAction(action);
    setIsAddTask(true);
  }

  React.useEffect(() => {
    async function get() {
      console.log("fetching");
      const token = localStorage.getItem("token");
      if (token) {
        const _userTasks = await getTasks(token);
        console.log(_userTasks)
        setUserTasks(_userTasks);
        const _teamTasks = await getTeamTasks(token);
        setTeamTasks(_teamTasks);
        console.log(_teamTasks)
      
      }
    }
    get();
  }, []);

  return (
    <div className="px-5">
      <div className="flex items-center my-3 justify-between">
        <div role="tablist" className="tabs tabs-boxed max-w-xs">
          {tabs.map((tab, index) => {
            return (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(index);
                }}
                key={tab}
                role="tab"
                className={`tab ${currentTab === index ? "tab-active" : ""}`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsAddTask((currentValue) => !currentTab);
            setFormAction('add')
          }}
          className="py-1 px-3 rounded bg-primary text-white text-sm"
        >
          Add Task
        </button>
      </div>

      {currentTab === 0 ? <TaskTable tasks={userTasks!} editTask={handleEditTask} /> : <TaskTable tasks={teamTasks!} editTask={handleEditTask} />}
      {isAddTask && <AddTaskForm taskId={taskId} action={formAction} close={setIsAddTask} />}
    </div>
  );
}

export default DashboardView;
