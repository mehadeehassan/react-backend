const { Sequelize } = require("sequelize");

//Database connection
const database = new Sequelize("shops", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = database;
