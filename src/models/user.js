const Sequelize = require("sequelize");

const sequelize = require("../db/connection");

const User = sequelize.define("user", {
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
  surname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bannerUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://2.bp.blogspot.com/-uMj800QiZKk/Totq8mtVHRI/AAAAAAAABH0/Cbmc2fCm16w/s1600/star-trek-for-facebook.jpg"
  },
  registrated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = User;
