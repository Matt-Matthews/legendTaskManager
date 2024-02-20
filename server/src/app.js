import express from "express";
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";
import teamRouter from "./routes/team.router.js";
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/team', teamRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
