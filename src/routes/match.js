const express = require("express");
const router = express.Router();

const Match = require("../models/match");
const User = require("../models/user");
const Team = require("../models/team");
const Tournament = require("../models/tournament");

router.get("/:idTournament", async (req, res, next) => {
  try {
    const idTournament = req.params.idTournament;

    const match = await Match.findAll({
      where: { idTournament: idTournament },
      include: [
        { attributes: ["name"], model: User, as: "homeUser" },
        { attributes: ["name"], model: User, as: "guestUser" },
        { attributes: ["name"], model: Team, as: "homeTeam" },
        { attributes: ["name"], model: Team, as: "guestTeam" }
      ]
    });

    res.json(match);
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/:idTournament/:matchId", async (req, res) => {
  try {
    const { idTournament, matchId } = req.params;

    const { scoreHome, scoreGuest } = req.body;

    const match = await Match.findOne({
      where: {
        idTournament,
        id: matchId
      }
    });

    const newMatchResults = await match.update({
      scoreHome,
      scoreGuest
    });

    res.json(newMatchResults);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
