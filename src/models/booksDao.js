import { dbRun, dbQuery } from "../utils/daoHelper.js";

const booksTable = `books(
  id          INTEGER PRIMARY KEY,
  title       TEXT    NOT NULL,
  author      TEXT    NOT NULL,
  year        INTEGER NOT NULL,
  publisher   TEXT,
  description TEXT,
  UNIQUE(title, author, year) ON CONFLICT IGNORE
)`;

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

export { booksTable, findBooks, addBook };
