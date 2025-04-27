const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get Top 10 Users by Credits
router.get('/', async (req, res) => {
    try {
        const topUsers = await User.find()
            .sort({ credits: -1 }) // Sort descending (highest credits first)
            .limit(10)
            .select('name email credits'); // Only show needed fields

        res.json(topUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;