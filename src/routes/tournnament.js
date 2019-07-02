const express = require("express");

const Tournament = require("../models/tournament");
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
    const teamIds = genRandom(players);
    let incrementer = 0;

    return teams.reduce((accumulation, team) => {
      accumulation = [...accumulation, [team, teamIds[incrementer]]];
      incrementer++;
      return accumulation;
    }, []);
  }

  function pairEnemies(number, playerAndTeam) {}

  const randomStuff = god(teams, players);

  const tournamentDone = [
    [randomStuff[0], randomStuff[1]],
    [randomStuff[2], randomStuff[3]]
  ];

  return res.json(tournamentDone);
  // return res.json(god(teams, players));

  // let tournament = await Tournament.findOne({ where: { name } });

  // if (tournament) {
  //   return res
  //     .status(400)
  //     .json({ msg: "Tournament with that name already exists" });
  // }

  tournament = await Tournament.create({
    name,
    beginDate: new Date(),
    bannerUrl,
    status,
    numberOfPlayers
  });

  res.json(tournament);
});

module.exports = router;
