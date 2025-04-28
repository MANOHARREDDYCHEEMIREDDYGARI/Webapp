const User = require('../models/User');
const Feed = require('../models/Feed');

exports.updateCredits = async (req, res) => {
    const { userId, credits } = req.body;
    try {
        await User.findByIdAndUpdate(userId, { credits });
        res.json({ message: 'Credits updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.userAnalytics = async (req, res) => {
    try {
        const users = await User.find();
        const feeds = await Feed.find();
        res.json({ usersCount: users.length, feedsCount: feeds.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
