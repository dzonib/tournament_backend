const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const TournamentRegistration = sequelize.define("tournamentregistration", {

  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = TournamentRegistration;
