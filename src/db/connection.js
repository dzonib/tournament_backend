const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "d4rvtsgnmdaimk",
  "dthclwisuvdryk",
  "10739dabcb8ceda7cdb2e7d78087b22b07cfb42287855e0102d973416afa2dac",
  {
    host: "ec2-54-217-235-87.eu-west-1.compute.amazonaws.com",
    dialect: "postgres",
    protocol: "postgres",

    dialectOptions: {
      ssl: true
    }
  }
);

module.exports = sequelize;
