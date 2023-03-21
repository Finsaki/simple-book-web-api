const { Router } = require("express");
const logger = require("../utils/logger");
const {
  findBooks,
  addBook,
  addTestBooks,
  findBook,
  deleteBook,
} = require("../models/booksDao");
const { validateBook, validateBookParams } = require("../utils/booksHelper");
const url = require("url");

const booksRouter = Router();

booksRouter.get("/", (req, res) => {
  const queryObject = url.parse(req.url, true).query; //query parameters
  const validQueryParams = validateBookParams(queryObject);
  //if any parameters were invalid then return error 400, no extra ones allowed
  if (validQueryParams.length !== Object.keys(queryObject).length) {
    return res
      .status(400)
      .json({ "Bad Request": "Query parameter rules violation" });
  }
  const values = findBooks(validQueryParams);
  //returns default 200 OK with json body
  return res.json(values);
});

//Has to be below other GET requests because otherwise those are never registered
booksRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(Number(id))) {
    return res.status(404).json({ "Not Found": "Invalid id" });
  }
  const value = findBook(id);
  //value is falsy or the value array is empty
  if (!value?.length) {
    return res.status(404).json({ "Not Found": "No matches for id" });
  }
  return res.json(value);
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

booksRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!Number.isInteger(Number(id))) {
    return res.status(404).json({ "Not Found": "Invalid id" });
  }
  const value = deleteBook(id);
  //if nothing was deleted then changes is 0
  if (!value || value.changes === 0) {
    return res.status(404).json({ "Not Found": "No matches for id" });
  }
  //no json body returned
  return res.status(204).send();
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
  return res.status(404).send({ error: "unknown endpoint" });
});

module.exports = { booksRouter };
