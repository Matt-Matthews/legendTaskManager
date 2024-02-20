import { API_URL } from "../config/configs";

async function getTasks(token: string, limit = 10, page = 1, teamId = '') {
  try {
    const response = await fetch(
      `${API_URL}/task/user?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

interface Task {
  name: string;
  description: string;
  dueDate: Date;
  status: string;
}
async function AddTask(task: Task, token: string) {
  try {
    const response = await fetch(`${API_URL}/task`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

async function editTask(task: Task, token: string, taskId: string) {
  try {
    let data = {};
    for (const [key, value] of Object.entries(task)) {
      if (value !== "") {
        Object.assign(data, { [key]: value });
      }
    }
    const response = await fetch(`${API_URL}/task/${taskId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

async function getTask(taskId: string, token: string) {
  try {
    const response = await fetch(`${API_URL}/task/${taskId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

async function assignTeamTask(token: string, teamId: string, taskId:string) {
  try {
    const response = await fetch(`${API_URL}/task/${taskId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({teamId})
    });

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

async function getTeamTasks(
  token: string,
  limit = 10,
  page = 1,
) {
  try {
    const response = await fetch(
      `${API_URL}/task/team?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export { getTasks, AddTask, editTask, getTask, assignTeamTask, getTeamTasks };
