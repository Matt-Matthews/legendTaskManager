import { createUser, handleLogin } from "../models/user.model.js";

const httpCreateUser = async (req, res) => {
  try {
    const results = await createUser(req.body.id); //save user data to database

    if (!results) {
      return res.status(409).send("User exist");
    }

    return res.status(201).send("successful");
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const httpHandleLogin = async (req, res) => {
  try {
    const token = await handleLogin(req.body.id); //authenticate user by comparing user input and database and return jwt if successfull

    if (!token) {
      res.status(404).send("incorrect email or password");
    }

    res.setHeader("Authorization", `Bearer ${token}`);
    return res.status(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const httpHandleLogout = async (req, res) => {};
export { httpCreateUser, httpHandleLogin, httpHandleLogout };
