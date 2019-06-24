const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const Tournament = sequelize.define("tournament", {

  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Tournament;
