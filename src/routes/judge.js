const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/user");
const handleUserEmail = require("../util/handleUserEmail");
const auth = require("../middleware/auth");

// REGISTER JUDGE ROUTE
router.post(
  "/register",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be between 5 and 30 charachters").isLength(
      { min: 5, max: 30 }
    )
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    const { error, firstName, lastName } = handleUserEmail(req.body.email);

    if (!errors.isEmpty()) {
      return res.json(errors);
    } else if (error) {
      return res.status(400).json({ msg: error });
    }

    try {
      const { email, password } = req.body;

      // CHECK IF USER EXISTS
      let user = await User.findOne({ where: { email } });

      if (user) {
        return res.status(400).json({
          msg: "User already exists"
        });
      }

      // HASH PASSWORD
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);

      // CREATE NEW USER
      user = await User.create({ email, password: newPassword, isJudge: true });

      return res.json(user);
    } catch (e) {
      return res.json({ msg: "Server Error" });
    }
  }
);

// LOGIN JUDGE ROUTE
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const { error, firstName, lastName } = handleUserEmail(req.body.email);

  if (error) {
    return res.status(400).json({ msg: error });
  }

  try {
    const user = await User.findOne({ email });

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      res.status(400).json({ msg: "Wrong password" });
    }

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // JWT PAYLOAD
    const payload = {
      email,
      firstName,
      lastName,
      glavatarUrl: user.glavatarUrl,
      isJudge: user.isJudge
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h"
    });

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
