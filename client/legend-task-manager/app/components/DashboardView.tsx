"use client";
import React from "react";
import TaskTable from "./TaskTable";
import AddTaskForm from "./AddTaskForm";

function DashboardView() {
  const [currentTab, setCurrentTab] = React.useState<number>(0);
  const tabs = ["Individual", "Team"];
  const [isAddTask, setIsAddTask] = React.useState(false);
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
          onClick={(e)=>{
            e.preventDefault();
            setIsAddTask(currentValue => !currentTab)
          }}
          className="py-1 px-3 rounded bg-primary text-white text-sm"
        >
          Add Task
        </button>
      </div>
      
      {currentTab === 0 ? <TaskTable /> : <TaskTable />}
      {isAddTask&&<AddTaskForm close={setIsAddTask} />}
    </div>
  );
}

export default DashboardView;
