const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Spend credits to unlock a feature
router.post('/spend', authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body; // How many credits the user wants to spend

        const user = await User.findById(req.user.id);

        if (user.credits < amount) {
            return res.status(400).json({ message: 'Not enough credits' });
        }

        user.credits -= amount;
        await user.save();

        res.json({ message: `Successfully spent ${amount} credits!`, credits: user.credits });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// Get Credit History
router.get('/history', authMiddleware, async (req, res) => {
    try {
        const history = await CreditHistory.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
module.exports = router;