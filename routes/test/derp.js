const express = require('express');
const router = express.Router();

// @route       GET api/auth
// @desc        Auth route
// @access      Public (no need for token, will create auth middleware)
router.get('/', (req, res) => res.send('Derrrrp route'));

module.exports = router;
