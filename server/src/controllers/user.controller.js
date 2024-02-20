import { createUser, handleLogin } from "../models/user.model.js";

const httpCreateUser = async (req, res) => {
  try {
    const results = await createUser(req.body); //save user data to database

    if (!results) {
      return res.status(409).json("User exist");
    }

    return res.status(201).json("successful");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const httpHandleLogin = async (req, res) => {
  try {
    const token = await handleLogin(req.body); //authenticate user by comparing user input and database and return jwt if successfull
    
    if (!token) {
      return res.status(404).json("incorrect email or password");
    }

    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200).json(token);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const httpHandleLogout = async (req, res) => {};
export { httpCreateUser, httpHandleLogin, httpHandleLogout };
