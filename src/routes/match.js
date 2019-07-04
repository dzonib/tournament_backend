const express = require("express");
const router = express.Router();

const Match = require("../models/match");

router.get("/:idTournament", async (req, res, next) => {
  //console.log(typeof ("TYPE OF ID", req.params.idTournament));
  //console.log("Bla" + req.params.idTournament);
  try {
    const idTournament = req.params.idTournament;
    console.log(JSON.stringify(idTournament));
    const match = await Match.findAll({
      where: { idTournament: idTournament }
    });
    res.json(match);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
