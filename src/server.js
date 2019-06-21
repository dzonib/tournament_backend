const express = require("express");

const sequelize = require("./db/connection");
const User = require("./models/user");

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() =>
    app.listen(port, console.log(`server running on http://localhost:${port}`))
  );
