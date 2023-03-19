const { existsSync, writeFileSync } = require("fs");
const Database = require("better-sqlite3");
const { booksTable } = require("../models/booksSchema");

let database;
const filepath = "./books.db";
const sqlCreateBooksTable = `CREATE TABLE ${booksTable}`;

const initDatabase = function () {
  if (existsSync(filepath)) {
    database = new Database(filepath);
  } else {
    //creating an empty database file
    writeFileSync(filepath, "", { flag: "wx" });
    database = new Database(filepath);
    dbRun(sqlCreateBooksTable, []);
  }
};

//to get many results
function dbQuery(sql, params) {
  return database.prepare(sql).all(params);
}

//to get a single (or none) results
function dbRun(sql, params) {
  return database.prepare(sql).run(params);
}

module.exports = { initDatabase, database, dbRun, dbQuery };
