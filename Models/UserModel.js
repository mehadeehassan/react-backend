const { Sequelize, DataTypes } = require("sequelize");
const database = require("../Config/database");

const UserModel = database.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = UserModel;
