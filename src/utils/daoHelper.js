import { existsSync, writeFileSync } from "node:fs";
import Database from "better-sqlite3";
import { booksTable } from "../models/booksDao.js";
import { USEMOCKDATA } from "./config.js";

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

    if (USEMOCKDATA) {
      console.log("MOCK");
      //!!!implement later
    }
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

export { initDatabase, database, dbRun, dbQuery };
