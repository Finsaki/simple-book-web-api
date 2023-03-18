import morgan from "morgan";

//setting up a custom morgan token that shows the request body data when the operation is a POST operation
morgan.token("response-body", function (req) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return null;
});

//will return json message instead of default 404
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export { morgan, unknownEndpoint };
