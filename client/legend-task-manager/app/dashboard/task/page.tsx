"use client";
import { assignTeamTask, getTask } from "@/app/api/task";
import { getTeams } from "@/app/api/team";
import AddTaskForm from "@/app/components/AddTaskForm";
import AddTeamForm from "@/app/components/AddTeamForm";
import AddTeamMemberForm from "@/app/components/AddTeamMember";
import Navbar from "@/app/components/Navbar";
import React, { useEffect, useState } from "react";

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

interface Team {
  createdAt: Date;
  description: string;
  members: Array<string>;
  name: string;
  owner: string;
  updatedAt: Date;
  __v: number;
  _id: string;
}

function TaskDetails() {
  const [taskId, setTaskId] = useState("");
  const [isAddTask, setIsAddTask] = useState(false);
  const [isAddTeam, setIsAddTeam] = useState(false);
  const [task, setTask] = useState<Task>();
  const [taskTeams, setTaskTeams] = useState<Array<Team>>();
  const [teamId, setTeamId] = useState<string>("");
  const [team, setTeam] = useState<Team>();
  const [isAddTeamMember, setIsAddTeamMember] = useState(false);
  useEffect(() => {
    async function get() {
      const param = new URLSearchParams(window.location.search);
      const _taskId = param.get("id");
      const token = localStorage.getItem("token");

      if (token && _taskId) {
        setTaskId(_taskId);
        const res = await getTask(_taskId, token);
        setTask(res);

        if (!res.teanId) {
          const teams = await getTeams(token);
          setTaskTeams(teams);

          if (teams.length > 0) {
            for (const team of teams) {
              if (team._id === res.teamId) {
                setTeam(team);
              }
            }
          }
        }
      }
    }

    get();
  }, []);

  async function assignTeam() {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await assignTeamTask(token, teamId, task!._id);
      console.log(res);
    }
  }
  return (
    <main className="h-screen">
      <Navbar />
      <div className="px-5 flex flex-col gap-y-2">
        <div className="flex items-center gap-x-10">
          <h3 className="font-bold text-lg">{task?.name}</h3>
          <button
            onClick={() => setIsAddTask((currentValue) => !currentValue)}
            className="py-1 px-3 rounded bg-primary text-white text-sm"
          >
            Edit
          </button>
        </div>
        <p>{task?.description}</p>
        <p className="text-sm">
          Due Date: {task?.dueDate?.toString().split("T")[0]}
        </p>
        <p className="text-sm">Status: {task?.status}</p>

        <p className="mt-5">Team: {team ?team?.name: 'Not Assigned'}</p>
        <form>
          <div className="flex items-center">
            <input
              type="radio"
              id="none"
              onChange={() => setTeamId("")}
              name="radio-7"
              className=""
            />
            <label className="ml-1 mb-px" htmlFor="none">
              None
            </label>
          </div>
          {taskTeams?.map((team) => {
            return (
              <div className="flex items-center" key={team._id}>
                <input
                  type="radio"
                  id={team._id}
                  name="radio-7"
                  onChange={(e) => setTeamId(e.target.value)}
                  value={team._id}
                  className=""
                />
                <label className="ml-1 mb-px" htmlFor={team._id}>
                  {team.name}
                </label>
              </div>
            );
          })}
        </form>
        <div className="flex items-center gap-x-5">
          {!task?.teamId && (
            <button
              onClick={assignTeam}
              className="py-1 px-3 rounded bg-primary text-white text-sm"
            >
              Assign Team
            </button>
          )}
          <button
            onClick={() => setIsAddTeam((currentValue) => !currentValue)}
            className="border-solid border-2 border-gray-400 py-0.5 px-3 text-sm rounded"
          >
            Create Team
          </button>
        </div>
        <p>Team Members {team?.members.length}</p>
        <button
            onClick={() => setIsAddTeamMember((currentValue) => !currentValue)}
            className="py-1 px-3 rounded bg-primary text-white text-sm max-w-40"
          >
            Add Team Member
          </button>
      </div>
      {isAddTeam && <AddTeamForm close={setIsAddTeam} userId={task!.owner} />}
      {isAddTask && (
        <AddTaskForm taskId={taskId} action="edit" close={setIsAddTask} />
      )}
      {isAddTeamMember&& <AddTeamMemberForm close={setIsAddTeamMember} teamId={team!._id} />}
    </main>
  );
}

export default TaskDetails;
