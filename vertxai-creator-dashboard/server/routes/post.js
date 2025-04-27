const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Create a post and reward credits
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = new Post({
            user: req.user.id,
            title,
            content,
        });

        await post.save();

        // Award +20 credits to the user
        const user = await User.findById(req.user.id);
        user.credits += 20;
        await user.save();

        res.json({ message: 'Post created and 20 credits awarded!', post });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;