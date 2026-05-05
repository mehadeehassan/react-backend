const express = require("express");
const routes = require("./Routes/api");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(express.json());
app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
