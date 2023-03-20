const { app } = require("./app");
const http = require("http");
const logger = require("./utils/logger");
const config = require("./utils/config");

//creates a http server to start receiving requests
const server = http.createServer(app);

server.listen(config.PORT, () => {
  return logger.info(`Server is listening on ${config.PORT}`);
});
