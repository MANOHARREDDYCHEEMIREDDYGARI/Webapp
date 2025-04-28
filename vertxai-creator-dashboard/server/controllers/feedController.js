const Feed = require('../models/Feed');
const axios = require('axios');

exports.fetchFeed = async (req, res) => {
    try {
        // Example API call (replace with actual Twitter/Reddit API)
        const dummyFeed = [
            { content: "Sample post from Twitter", source: "Twitter" },
            { content: "Sample post from Reddit", source: "Reddit" }
        ];
        await Feed.insertMany(dummyFeed);
        const feeds = await Feed.find({ reported: false });
        res.json(feeds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.saveFeed = async (req, res) => {
    const { feedId } = req.body;
    try {
        const user = await User.findById(req.user.id);
        user.savedFeeds.push(feedId);
        user.credits += 10; // Reward points
        await user.save();
        res.json({ message: 'Feed saved and credits updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.reportFeed = async (req, res) => {
    const { feedId } = req.body;
    try {
        await Feed.findByIdAndUpdate(feedId, { reported: true });
        res.json({ message: 'Feed reported' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
