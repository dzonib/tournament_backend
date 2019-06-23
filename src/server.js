require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./db/connection");
const User = require("./models/user");

// ROUTES IMPORT
const judgeRoutes = require("./routes/judge");

const app = express();

app.use(cors());
app.use(express.json());

// DECLARE ROUTES
app.use("/judge", judgeRoutes);

const port = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() =>
    app.listen(port, console.log(`server running on http://localhost:${port}`))
  );
