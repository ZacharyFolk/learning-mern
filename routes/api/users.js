const express = require("express");
const router = express.Router();

// @route       GET api/users
// @desc        Test route
// @access      Public (no need for token, will create auth middleware)
router.get("/", (req, res) => res.send("User route"));

module.exports = router;
