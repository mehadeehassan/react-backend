const express = require("express");
const routes = require("./Routes/api");
const bodyParser = require("body-parser");
const database = require("./Config/database");

try {
  database.authenticate();
  console.log("Database connection successfully");
} catch (error) {
  console.log("Database connection failed");
}

//Application Boot
const app = express();
const port = 3000;
app.use(express.json());
app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
