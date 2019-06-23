const Sequelize = require("sequelize");

// Make another db for production, this one is not safe (db info pushed to github public repo)
// .env is not in .gitignore
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    protocol: "postgres",

    dialectOptions: {
      ssl: true
    }
  }
);

module.exports = sequelize;
