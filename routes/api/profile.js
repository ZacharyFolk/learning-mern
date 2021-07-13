const express = require("express");
const router = express.Router();

// @route       GET api/profile
// @desc        Test route
// @access      Public (no need for token, will create auth middleware)
router.get("/", (req, res) => res.send("Profile route"));

module.exports = router;
