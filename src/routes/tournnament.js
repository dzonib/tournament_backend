const express = require("express");

const Tournament = require("../models/tournament");
const Match = require("../models/match");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const {
    name,
    beginDate,
    bannerUrl,
    status,
    numberOfPlayers,
    teams,
    players
  } = req.body;

  let tournament = await Tournament.findOne({ where: { name } });

  if (tournament) {
    return res
      .status(400)
      .json({ msg: "Tournament with that name already exists" });
  }

  tournament = await Tournament.create({
    name,
    beginDate: new Date(),
    bannerUrl,
    status,
    numberOfPlayers,
    beginDate
  });

  const genRandom = function(numArr) {
    let nums = numArr,
      ranNums = [],
      i = nums.length,
      j = 0;

    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      ranNums.push(nums[j]);
      nums.splice(j, 1);
    }
    return ranNums;
  };

  function god(teams, players) {
    const playersIds = genRandom(players);
    let incrementer = 0;

    return teams
      .reduce((accumulation, team) => {
        accumulation = [...accumulation, [team, playersIds[incrementer]]];
        incrementer++;
        return accumulation;
      }, [])
      .reduce((accumulation, value, index) => {
        return (
          (index % 2 === 0
            ? accumulation.push([value])
            : accumulation[accumulation.length - 1].push(value)) && accumulation
        );
      }, [])
      .map(async (items, index) => {
        match = await Match.create({
          scoreHome: 0,
          scoreGuest: 0,
          drowPosition: index + 1,
          phaseName: status,
          deleted: false,
          idHomeTeam: items[0][0].id,
          idGuestTeam: items[1][0].id,
          idTournament: tournament.id,
          idHomeUser: items[0][1].id,
          idGuestUser: items[1][1].id
        });
      });
  }

  return res.json({ id: tournament.id });
});

/*match = await Match.create({
  scoreHome,
  scoreGuest,
  drawPosition,
  phaseName,
  deleted,
  idHomeTeam,
  idGuestTeam,
  idTournament,
  idHomeUser,
  idGuestUser
});*/

module.exports = router;
