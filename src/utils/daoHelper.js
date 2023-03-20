const { existsSync, writeFileSync } = require("fs");
const Database = require("better-sqlite3");
const { booksTable } = require("../models/booksSchema");

/**
 * About better SQLite
 * Database connections are automatically closed when they are garbage collected. So no need to .close()
 * Transactions are serialized (you can't have more than one at a time)
 * Rather than run queries asynchronously it runs every query in the main thread. So no need to use promises.
 */

let database;
const filepath = "./books.db";
const sqlCreateBooksTable = `CREATE TABLE ${booksTable}`;

//Create database connection to existing db-file or create it first and then connect
const initDatabase = function () {
  if (existsSync(filepath)) {
    database = new Database(filepath);
  } else {
    //creating an empty database file, flag: wx rechecks if file already exists and throws an error
    writeFileSync(filepath, "", { flag: "wx" });
    database = new Database(filepath);
    dbRun(sqlCreateBooksTable, []);
  }
};

//to Read, "all" method with the "prepare" statement returns all the queried rows
function dbQuery(sql, params) {
  return database.prepare(sql).all(params);
}

//to Create, Update, Delete
function dbRun(sql, params) {
  return database.prepare(sql).run(params);
}

module.exports = { initDatabase, database, dbRun, dbQuery };
