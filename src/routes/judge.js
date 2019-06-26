const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const handleUserEmail = require("../util/handleUserEmail");
const auth = require("../middleware/auth");
const hashPassword = require("../util/hashPassword");

// REGISTER JUDGE ROUTE
router.post(
  "/register"/*,
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be between 5 and 30 charachters").isLength(
      { min: 5, max: 30 }
    )
  ]*/,
  async (req, res, next) => {
    // const errors = validationResult(req);

    // const { error, firstName, lastName } = handleUserEmail(req.body.email);

    // if (!errors.isEmpty()) {
    //   return res.json(errors);
    // } else if (error) {
    //   return res.status(400).json({ msg: error });
    // }

    try {
      const { username, name, surname, category, email, password } = req.body;

      // CHECK IF USER EXISTS
      let user = await User.findOne({ where: { email } });

      if (user) {
        return res.status(400).json({
          msg: "User already exists"
        });
      }

      // HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // CREATE NEW USER
      user = await User.create({ username, name, surname, category, email, password: hashedPassword });

      return res.json(user);
    } catch (e) {
      return res.json(e);
    }
  }
);

// LOGIN JUDGE ROUTE
router.post("/login", async (req, res, next) => {
  const { password, username } = req.body;

  // if logging with email
  // const { error, firstName, lastName } = handleUserEmail(req.body.email);

  // if (error) {
  //   return res.status(400).json({ msg: error });
  // }

  try {
    let user = await User.findOne({ username });

 

    // const newPassword = await bcrypt.hash('gaga', 10)
    // console.log(newPassword)
    // if password is hashed
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // JWT PAYLOAD
    const payload = {
      name: user.name,
      surname: user.surname,
      glavatar: user.bannerUrl,
      category: user.category
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json(token);
  } catch (e) {
    return res.status(400).json({ msg: "Server Error" });
  }
});

// TEST PROTECTED ROUTE

router.get("/test", auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
