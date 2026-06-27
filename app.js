const path = require('path');
require("dotenv").config();
const express = require("express");
//routes section
const routes = require("./Routes/api");
//body parser section
const bodyParser = require("body-parser");
//database section
const database = require("./Config/database");
//cors section
const cors = require("cors");

//Application BootUp
const app = express();
const port = process.env.PORT || 3000;
//body parser section
app.use(express.json());
//cors section
app.use(
  cors({
    origin: ["https://ecommerce-alpha-sepia-61.vercel.app", "http://localhost:5173"],
    credentials: true,
  }),
);
//routes section
// app.use('/Products', express.static('Public/Products'));
// app.use('/Products', express.static(path.join(__dirname, 'Public/Products')));
app.use('/uploads', express.static(path.join(__dirname, 'Public/Products')));
app.use(routes);

async function startServer() {
  try {
    await database.authenticate();
    console.log("Database connection successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

startServer();
