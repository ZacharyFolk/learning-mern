const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Posts = require('../../models/Posts');

const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route       POST api/posts
// @desc        Create a post
// @access      Private

router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // name and avatar comes from model, not something we sending in request
      const user = await User.findById(req.user.id).select('-password');

      // need to instantiate a new post from the model
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       GET api/posts
// @desc        Get all post
// @access      Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); // From most recent (oldest = default = 1)
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       GET api/posts/:id
// @desc        Get post by id
// @access      Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // From most recent (oldest = default = 1)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    // if id not valid object id
    // check for property to see if it formatted correct
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       DELETE api/posts/:id
// @desc        Delete a post
// @access      Private

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user owns post
    // matching an object and a string

    if (post.user.toString() !== req.user.id) {
      res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route       PUT api/posts/like/:id
// @desc        Like a post
// @access      Private

router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // id available in url

    // Check if the post has already been liked by this user
    // use filter as high order array method
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    // instead of push do unshift to put on beginning using logged in user
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       PUT api/posts/unlike/:id
// @desc        Unlike a post
// @access      Private

router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); // id available in url

    // Check if the post has already been liked
    // If = 0 then havent liked it yet
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }
    // Get remove index for correct 'like' to remove
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/posts/comment/:id
// @desc        Comment on a post
// @access      Private

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id);

      // not an actual collection in db, new object so dont need 'new' here
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       Delete api/posts/comment/:id/:comment_id
// @desc        Delete a comment
// @access      Private

router.delete('/comment/:id/:comment_id', [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    // Check user
    if (comment.user.toString() != req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(
      removeIndex,

      1
    );
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
