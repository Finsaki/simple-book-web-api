const morgan = require("morgan");
const logger = require("./logger");

//setting up a custom morgan token that shows the request body data when the operation is a POST operation
morgan.token("response-body", function (req) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return null;
});

//will return json message instead of default 404
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.name, error.message);

  if (error.name === "SqliteError") {
    return response.status(500).send({ error: "database error" });
  } else if (error.name === "SomeError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { morgan, unknownEndpoint, errorHandler };
