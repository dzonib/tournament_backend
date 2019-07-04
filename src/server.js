require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./db/connection");
const User = require("./models/user");
const Match = require("./models/match");
const Team = require("./models/team");
const Tournament = require("./models/tournament");
const TournamentRegistration = require("./models/tournamentregistration");

// ROUTES IMPORT
const judgeRoutes = require("./routes/judge");
const teamRoutes = require("./routes/teams");
const userRoutes = require("./routes/users");
const tournamentRoutes = require("./routes/tournnament");
const matchRoutes = require("./routes/match");

const app = express();

app.use(cors());
app.use(express.json());

// DECLARE ROUTES
app.use("/judge", judgeRoutes);
app.use("/teams", teamRoutes);
app.use("/users", userRoutes);
app.use("/tournament", tournamentRoutes);
app.use("/matches", matchRoutes);

// DATABASE CONNECTIONS
Team.hasMany(Match, { foreignKey: "idHomeTeam" });
Team.hasMany(Match, { foreignKey: "idGuestTeam" });
Tournament.hasMany(Match, { foreignKey: "idTournament" });
Match.belongsTo(User, { foreignKey: "idHomeUser" });
Match.belongsTo(User, { foreignKey: "idGuestUser" });
TournamentRegistration.belongsTo(User, { foreignKey: "idUser" });
Tournament.hasMany(TournamentRegistration, { foreignKey: "idTournament" });

const port = process.env.PORT || 5000;

sequelize
  .sync(/*{force: true}*/)
  .then(() =>
    app.listen(port, console.log(`server running on http://localhost:${port}`))
  );
