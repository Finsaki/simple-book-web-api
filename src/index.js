import { app } from "./app.js";
import * as http from "http";
import * as config from "./utils/config.js";

//creates a http server to start receiving requests
const server = http.createServer(app);

server.listen(config.PORT, () => {
  return console.log(`Server is listening on ${config.PORT}`);
});
