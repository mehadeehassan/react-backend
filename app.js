const express = require("express");
//routes section
const routes = require("./Routes/api");
//body parser section
const bodyParser = require("body-parser");
//database section
const database = require("./Config/database");
//cors section
const cors = require("cors");

//database connection
try {
  database.authenticate();
  console.log("Database connection successfully");
} catch (error) {
  console.log("Database connection failed");
}

//Application BootUp
const app = express();
const port = 3000;
//body parser section
app.use(express.json());
//cors section
app.use(cors());
//routes section
app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
