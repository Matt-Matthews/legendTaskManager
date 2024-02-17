import express from "express";
import userRouter from "./routes/user.router.js";
import taskRouter from "./routes/task.router.js";
import teamRouter from "./routes/team.router.js";

const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/task', taskRouter);
app.use('/team', teamRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

export default app;
