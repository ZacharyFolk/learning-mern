const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/Users');
// Validator docs : https://express-validator.github.io/docs/

// @route       GET api/users
// @desc        Register user
// @access      Public (no need for token, will create auth middleware)

// router.get("/", (req, res) => res.send("User route"));

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Enter a password with 6 or more chars').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists (avoid multiple emails)
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] }); // match same type of error as validation errors
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm', // a default avatar
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt the password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save(); // anything that returns a promise should use await, cleaner than using a lot of .then()

      // res.send("User registered");

      // Return jsonwebtoken so on frontend user is logged in immediately
      // https://github.com/auth0/node-jsonwebtoken
      // web token allows to access protected areas after register

      const payload = {
        user: {
          // get id from earlier promise
          id: user.id, // mongoose abstraction removes need to use the _ that is in mdb
        },
      };

      jwt.sign(
        // assign the token
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 }, // optional, change to 3600/1 hr
        (err, token) => {
          // callback arrow function
          if (err) throw err;
          res.json({ token }); // could send user.id but just using token
          // use site https://jwt.io  to decode encryption of token
        }
      ); // put the secret in config/default.json
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
