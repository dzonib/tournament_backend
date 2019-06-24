const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const Team = sequelize.define("team", {
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
  country: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bannerUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://2.bp.blogspot.com/-uMj800QiZKk/Totq8mtVHRI/AAAAAAAABH0/Cbmc2fCm16w/s1600/star-trek-for-facebook.jpg"
  },
  leagueName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Team;
