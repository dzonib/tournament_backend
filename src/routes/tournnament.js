const express = require("express");

const Tournament = require("../models/tournament");
const Match = require("../models/match");
const User = require("../models/user");
const Team = require("../models/team");
const router = express.Router();

const getPhaseNameByPlayersNumber = require("../util/getPhaseNameByPlayersNumber");

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

  // TOURNAMENT DRAW**************************************
  (async function god(teams, players) {
    const playersIds = genRandom(players);
    let incrementer = 0;
    return await teams
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
      .forEach(async (items, index) => {
        // we are getting all teams here
        // console.log("ITEMS FROM MAP ", items);
        try {
          match = await Match.create({
            scoreHome: 0,
            scoreGuest: 0,
            drowPosition: index + 1,
            phaseName: getPhaseNameByPlayersNumber(
              tournament.numberOfPlayers - 1
            ),
            deleted: false,
            idHomeTeam: items[0][0].id,
            idGuestTeam: items[1][0].id,
            idTournament: tournament.id,
            idHomeUser: items[0][1].id,
            idGuestUser: items[1][1].id
          });
        } catch (e) {
          console.log(e.message);
        }

        // when everything is ok (this logs before matches)
        // when this runs last (after the route return it brakes)
        console.log("AFTER EVERY MATCH IS ADDED", JSON.stringify(match));
      });
  })(teams, players);

  console.log("THIS SHOULD RUN AFTER EVERY MATCH IS ADDED");

  return res.json({ id: tournament.id });
});

//*************************
router.put("/next-round/:tournamentId/:matchId", async (req, res) => {
  try {
    // console.log("Finish ------------ GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    const { tournamentId, matchId } = req.params;

    // console.log(req.params);
    const tournament = await Tournament.findByPk(tournamentId);
    const currentMatch = await Match.findByPk(matchId); //ADDED

    // const newStatus = Number(tournament.status) + 1;
    const updatedTournament = await tournament.update({
      numberOfPlayers: tournament.numberOfPlayers - 1,
      status: getPhaseNameByPlayersNumber(tournament.numberOfPlayers - 1)
      // status: String(newStatus)
    });

    //ADDED
    const updatedMatch = await currentMatch.update({
      deleted: true
    });

    // handle match
    // include winnder update loser to deleated

    const match = await Match.findAll({
      where: { id: matchId },
      include: [
        { attributes: ["name"], model: User, as: "homeUser" },
        { attributes: ["name"], model: User, as: "guestUser" },
        { attributes: ["name"], model: Team, as: "homeTeam" },
        { attributes: ["name"], model: Team, as: "guestTeam" }
      ]
    });
    // add the names of winners in second array in angular and pull them in one by one
    res.json(match);

    // res.json(updatedTournament);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
