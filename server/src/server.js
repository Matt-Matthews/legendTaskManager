import http from "http";
import app from "./app.js";
import { PORT } from "./config/configs.js";

const port = PORT || 8000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("the server is running");
});
