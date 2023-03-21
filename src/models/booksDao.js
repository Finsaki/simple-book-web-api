const logger = require("../utils/logger");
const { dbRun, dbQuery } = require("../utils/daoHelper");
const { createBookParamsSql } = require("../utils/booksHelper");

const findBooks = (validQueryParams) => {
  logger.debug("Querying for books from the database");
  let sqlQuery = "SELECT * FROM books";
  //adding the prebuilt params sql to the query, dbQuery uses prepare statement for it so no need to sanitize
  sqlQuery += createBookParamsSql(validQueryParams);
  const results = dbQuery(sqlQuery, []);
  return results;
};

//Inserting a new book and returning the id
const addBook = (book) => {
  logger.debug("Adding a book to the database");
  let sqlQuery = `INSERT INTO books(
    title, author, year, publisher, description
  ) VALUES (?,?,?,?,?);`;
  const results = dbRun(sqlQuery, book);
  return results;
};

const findBook = (id) => {
  logger.debug("Querying a book from the database");
  let sqlQuery = "SELECT * FROM books WHERE id = ?";
  const result = dbQuery(sqlQuery, [id]);
  return result;
};

const deleteBook = (id) => {
  logger.debug("Deleting a book from the database");
  let sqlQuery = "DELETE FROM books WHERE id = ?";
  const result = dbRun(sqlQuery, [id]);
  return result;
};

//Unlike sqlite operations which dont support async, import returns a promise and needs to be async
const addTestBooks = async () => {
  logger.debug("Importing books from file to the database");
  const json = await import("../utils/mockBooks.json"); // import local json file for testing
  const data = json.default; //.default gets the actual data
  let totalChanges = [];
  for (let obj of data) {
    totalChanges.push(addBook(Object.values(obj)));
  }
  //better-sqlite3 provides changes and lastInsertRowid as return values for every Create
  const results = totalChanges.reduce((sum, item) => sum + item.changes, 0);
  return results;
};

module.exports = { findBooks, addBook, addTestBooks, findBook, deleteBook };
