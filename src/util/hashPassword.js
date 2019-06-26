const bcrypt = require("bcryptjs");

module.exports = async function(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);
    
    return newPassword;
  } catch (e) {
    console.log(e.message);
  }
};
