const { Router } = require("express");
const { addTestBooks, deleteAllBooks } = require("../models/booksDao");

const testsRouter = Router();

/**
 * These routes are made to help with testing
 * The implementation is not fully restful but it is restricted to test-environment
 */

//Quickly adds books to database to help with testing
testsRouter.post("/books/:id", async (req, res) => {
  console.log(req.params.id);
  //could also use body instead of params
  if (req.params.id === "createBooks") {
    try {
      const amountChanged = await addTestBooks();
      return res.status(200).json({ "Books Inserted": amountChanged });
    } catch (err) {
      logger.error(err);
    }
  }
  return res.status(404).send({ error: "unknown endpoint" });
});

//Quickly clears the database to help with testing.
testsRouter.delete("/books/:id", (req, res) => {
  console.log(req.params.id);
  if (req.params.id === "deleteAllBooks") {
    const amountChanged = deleteAllBooks();
    return res.status(200).json({ "Books Deleted": amountChanged });
  }
  return res.status(404).send({ error: "unknown endpoint" });
});

module.exports = { testsRouter };
