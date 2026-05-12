const { Sequelize } = require("sequelize");
const database = new Sequelize("shops", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});

module.exports = database;
