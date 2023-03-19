const booksTable = `books(
  id          INTEGER PRIMARY KEY,
  title       TEXT    NOT NULL,
  author      TEXT    NOT NULL,
  year        INTEGER NOT NULL,
  publisher   TEXT,
  description TEXT,
  UNIQUE(title, author, year) ON CONFLICT IGNORE
)`;

module.exports = { booksTable };
