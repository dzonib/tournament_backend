const express = require("express");
const router = express.Router();

const Team = require("../models/team");

router.get("/", async (req, res, next) => {
  const teams = await Team.findAll();

  res.json(teams);
});



module.exports = router