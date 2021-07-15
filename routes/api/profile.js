const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // now can add this as a second parameter
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route       GET api/profile/me
// @desc        Get current user profile
// @access      Private (requires token)
router.get('/me', auth, async (req, res) => {
  // async await because mongoose returns promise
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      // Cool! Use populate to get more info from user model
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
