import User from "../schemas/user.schema.js";
import {
  handlePasswordHash,
  validatePassword,
} from "../helpers/password.helper.js";
import { createJwt } from "../helpers/jwt.helper.js";

const createUser = async (user) => {
  const userExist = await User.findOne({ email: user.email }).exec(); //check if the user with same email exist
  if (userExist) return null;

  const password = await handlePasswordHash(user.password); //hash the password
  const userData = await User({
    ...user,
    password,
  });
  const _user = await userData.save();
  return _user; 
};

const handleLogin = async ({ email, password }) => {
  const user = await User.findOne({ email }).exec();

  if (!user) return null; //return a message if user does not exist

  const {
    password: userPassword,
    firstName,
    id,
    lastName,
    email: userEmail,
    contact,
  } = user;

  const isPasswordMatch = await validatePassword(userPassword, password); //compares the password with the hashed password from database
  if (isPasswordMatch) {
    return createJwt({ id, firstName, lastName, email: userEmail, contact }); //returns a json token is password is correct
  }

  return null;
};

export { createUser, handleLogin };
