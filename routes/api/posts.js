const express = require('express');
const router = express.Router();

// @route       GET api/posts
// @desc        Test route
// @access      Public (no need for token, will create auth middleware)
router.get('/', (req, res) => res.send('Post route'));

module.exports = router;
