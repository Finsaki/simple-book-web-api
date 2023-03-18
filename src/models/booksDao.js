import { database } from "../utils/daoHelper.js";

const booksTable = `books(
  id          INTEGER PRIMARY KEY,
  title       TEXT    NOT NULL,
  author      TEXT    NOT NULL,
  year        INTEGER NOT NULL,
  publisher   TEXT,
  description TEXT
)`;

const findBooks = () => {
  console.log("Querying for books from the database");
  let sql = "SELECT * FROM books";
  database.all(sql, [], (err, rows) => {
    //!!!add error handling
    if (err) throw err;
    return rows;
  });
};

export { booksTable, findBooks };
