import http from "http";
import app from "./app.js";
import { PORT } from "./config/configs.js";
import {connect} from "./helpers/db.helper.js";

const port = PORT || 8000;

const server = http.createServer(app);

server.listen(port, () => {
  connect();
  console.log("the server is running");
});
