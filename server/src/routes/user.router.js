import express from 'express';
import { httpCreateUser, httpHandleLogin, httpHandleLogout } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', httpCreateUser);
userRouter.post('/login', httpHandleLogin);
userRouter.get('/logout', httpHandleLogout);

export default userRouter;