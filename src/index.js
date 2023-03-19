const { app } = require("./app");
const http = require("http");
const config = require("./utils/config");

//creates a http server to start receiving requests
const server = http.createServer(app);

server.listen(config.PORT, () => {
  return console.log(`Server is listening on ${config.PORT}`);
});
