const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const { initDatabase } = require("./utils/daoHelper");
const { booksRouter } = require("./controllers/books");

/**
 * The main connection in backend which asigns specific routes to different routers and sets their cors policies
 * Also handles starting the database connection and implements middlewares to catch requests, responses and errors
 */

//--------connection to db here-------------
try {
  logger.info("Program starting...");
  initDatabase();
} catch (err) {
  logger.error(err);
  logger.error(
    "Shutting down because there was an error settinig up the database."
  );
  process.exit(1);
}

//--------middlewares here (other than error handling), before routers-------
//setting cors policy for api routes to accept requests from allowed URI addresses only
app.use(cors({ credentials: true, origin: config.CONNECTIONURI }));
app.use(express.json());
app.use(
  middleware.morgan(
    ":method :url :status :res[content-length] :response-time ms :response-body"
  )
);

//--------routers here, (GET, POST, PUT..).---------
app.use("/books", booksRouter);

//--------API error handling here, errorhandler last-------
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = { app };
