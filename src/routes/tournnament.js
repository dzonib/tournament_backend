const express = require("express");

const Tournament = require("../models/tournament");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { name, beginDate, bannerUrl, status, numberOfPlayers } = req.body;

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
    numberOfPlayers
  });

  res.json(tournament);
});

module.exports = router;
