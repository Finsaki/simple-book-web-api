import { existsSync, writeFileSync } from "node:fs";
import sqlite from "sqlite3";
import { booksTable } from "../models/booksDao.js";
import { USEMOCKDATA } from "./config.js";

let database;
const filepath = "./books.db";
const sqlCreateBooksTable = `CREATE TABLE ${booksTable}`;

const initDatabase = function () {
  if (existsSync(filepath)) {
    database = new sqlite.Database(filepath, sqlite.OPEN_READWRITE);
  } else {
    //creating an empty database file
    writeFileSync(filepath, "", { flag: "wx" });
    database = new sqlite.Database(filepath, sqlite.OPEN_READWRITE);
    database.run(sqlCreateBooksTable);
    if (USEMOCKDATA) {
      console.log("MOCK");
      //!!!implement later
    }
  }
};

export { initDatabase, database };
