const { dbRun, dbQuery } = require("../utils/daoHelper");

const findBooks = () => {
  console.log("Querying for books from the database");
  let sqlQuery = "SELECT * FROM books";
  const results = dbQuery(sqlQuery, []);
  return results;
};

//Inserting a new book and returning the id
const addBook = (book) => {
  console.log("Adding a book to the database");
  let sqlQuery = `INSERT INTO books(
    title, author, year, publisher, description
  ) VALUES (?,?,?,?,?);`;
  const results = dbRun(sqlQuery, book);
  return results;
};

const addTestBooks = async () => {
  const json = await import("../utils/mockBooks.json"); // import local json file for testing
  const data = json.default; //.default gets the actual data
  let totalChanges = [];
  for (let obj of data) {
    totalChanges.push(addBook(Object.values(obj)));
  }
  const results = totalChanges.reduce((sum, item) => sum + item.changes, 0);
  return results;
};

module.exports = { findBooks, addBook, addTestBooks };
