import { Router } from "express";
import { findBooks } from "../models/booksDao.js";

const booksRouter = Router();

booksRouter.get("/", (req, res) => {
  const values = findBooks();
  res.json(values);
});

export { booksRouter };
