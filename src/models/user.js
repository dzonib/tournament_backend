const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isJudge: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
