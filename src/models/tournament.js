const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const Tournament = sequelize.define("tournament", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  beginDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  bannerUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://2.bp.blogspot.com/-uMj800QiZKk/Totq8mtVHRI/AAAAAAAABH0/Cbmc2fCm16w/s1600/star-trek-for-facebook.jpg"
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: false
  },
  numberOfPlayers: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Tournament;
