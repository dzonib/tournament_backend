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

    return teams
      .reduce((accumulation, team) => {
        accumulation = [...accumulation, [team, teamIds[incrementer]]];
        incrementer++;
        return accumulation;
      }, [])
      .reduce((accumulation, value, index) => {
        return (
          (index % 2 === 0
            ? accumulation.push([value])
            : accumulation[accumulation.length - 1].push(value)) && accumulation
        );
      }, []);
  }

  // function makeEnemies(list, elementsPerSubArray) {
  //   var matrix = [],
  //     i,
  //     k;

  //   for (i = 0, k = -1; i < list.length; i++) {
  //     if (i % elementsPerSubArray === 0) {
  //       k++;
  //       matrix[k] = [];
  //     }

  //     matrix[k].push(list[i]);
  //   }

  //   return matrix;
  // }

  // return res.json(makeEnemies(god(teams, players), 2));
  return res.json(god(teams, players));
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
