import axios from "axios";
import { API_URL } from "../config/configs";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

export default async function handleAuth(data: any, path: string) {
  try {
    const response = await fetch(API_URL + path, 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

async function register(data:User){
  try {
    const response = await fetch(API_URL + '/user/register', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const results = await response.json();
    return results;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

// export { login, register };
