const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const Match = sequelize.define("match", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  scoreHome: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  scoreGuest: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  drowPosition: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  phaseName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  idHomeTeam: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idGuestTeam: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idHomeUser: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idGuestUser: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idTournament: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Match;
