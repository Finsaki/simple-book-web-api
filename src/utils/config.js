const { config } = require("dotenv");
config();

//Set the port where you want backend to run
const PORT = process.env.PORT || "9000";

//For outside connections, include  URI (for example 'http://localhost:3000')
const CONNECTIONURI = process.env.CONNECTIONURI || "";

module.exports = { PORT, CONNECTIONURI };
