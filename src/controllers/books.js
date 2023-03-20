const { Router } = require("express");
const logger = require("../utils/logger");
const { findBooks, addBook, addTestBooks } = require("../models/booksDao");
const { validateBook, validateBookParams } = require("../utils/booksHelper");
const url = require("url");

const booksRouter = Router();

booksRouter.get("/", (req, res) => {
  const queryObject = url.parse(req.url, true).query; //query parameters
  const validQueryParams = validateBookParams(queryObject);
  if (validQueryParams.length !== Object.keys(queryObject).length) {
    return res
      .status(400)
      .json({ "Bad Request": "Query parameter rules violation" });
  }

  const values = findBooks(validQueryParams);
  res.json(values);
});

booksRouter.post("/", (req, res) => {
  const { title, author, year, publisher, description } = req.body;

  const errorMsgObj = validateBook(title, author, year, publisher);
  if (errorMsgObj) {
    return res.status(400).json(errorMsgObj);
  }

  const value = addBook([title, author, year, publisher, description]);
  //better-sqlite3 provides changes and lastInsertRowid as return values for every Create
  if (value.changes === 0) {
    return res
      .status(400)
      .json({ "Bad Request": "Unique constraint violation" });
  }
  return res.status(200).json({ id: value.lastInsertRowid });
});

//Quickly adds books to database to help with testing.
booksRouter.post("/test", async (req, res) => {
  //request body must contain { "mockBooks": true }
  if (process.env.NODE_ENV === "test" && req.body.mockBooks === true) {
    try {
      const values = await addTestBooks();
      return res.status(200).json({ "Books Inserted": values });
    } catch (err) {
      logger.error(err);
    }
  }
  res.status(404).send({ error: "unknown endpoint" });
});

module.exports = { booksRouter };
