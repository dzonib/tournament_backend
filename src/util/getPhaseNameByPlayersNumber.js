module.exports = function getPhaseNameByPlayersNumber(playersNumber) {
  if (playersNumber === 2) {
    return "finale";
  } else if (playersNumber <= 4) {
    return "semi-finals";
  } else if (playersNumber <= 8) {
    return "quarter-finals";
  } else if (playersNumber <= 16) {
    return "8th-finals";
  } else if (playersNumber <= 32) {
    return "16th-finals";
  }
};
