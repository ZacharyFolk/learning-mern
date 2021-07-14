const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
// Validator docs : https://express-validator.github.io/docs/

// @route       GET api/users
// @desc        Register user
// @access      Public (no need for token, will create auth middleware)

// router.get("/", (req, res) => res.send("User route"));

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Enter a password with 6 or more chars").isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send("User route");
  }
);

module.exports = router;
