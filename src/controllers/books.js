const { Router } = require("express");
const { findBooks, addBook, addTestBooks } = require("../models/booksDao");

const booksRouter = Router();

booksRouter.get("/", (req, res) => {
  try {
    const values = findBooks();
    res.json(values);
  } catch (err) {
    console.error("Error while getting books: ", err.message);
    next(err);
  }
});

booksRouter.post("/", (req, res) => {
  const { title, author, year, publisher, description } = req.body;

  let errorMsgObj = validateBook(title, author, year, publisher);
  if (errorMsgObj) {
    return res.status(400).json(errorMsgObj);
  }

  try {
    const value = addBook([title, author, year, publisher, description]);
    //better-sqlite3 provides changes and lastInsertRowid on every Insert
    if (value.changes === 0) {
      return res
        .status(400)
        .json({ "Bad Request": "Unique constraint violation" });
    }
    return res.status(200).json({ id: value.lastInsertRowid });
  } catch (err) {
    console.error("Error trying to add a new book to db: ", err.message);
    next(err);
  }
});

//Quickly adds books to database to help with testing
booksRouter.post("/test", async (req, res) => {
  //request body must contain { "mockBooks": true }
  if (process.env.NODE_ENV === "test" && req.body.mockBooks === true) {
    try {
      const values = await addTestBooks();
      return res.status(200).json({ "Books Inserted": values });
    } catch (err) {
      console.error("Error while importing test data for books: ", err.message);
      next(err);
    }
  }
  res.status(404).send({ error: "unknown endpoint" });
});

function validateBook(title, author, year, publisher) {
  if (!(title && author && year)) {
    return { "Bad Request": "Title, Author and Year are required" };
  }
  if (!Number.isInteger(year)) {
    return { "Bad Request": "Year needs to be an Integer" };
  }
  //we want to allow publisher to be optional but it cannot be empty
  if (!(publisher || (!publisher && publisher !== ""))) {
    return { "Bad Request": "Publisher is optional but cannot be empty" };
  }
  return null;
}

module.exports = { booksRouter };
