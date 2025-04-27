// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from headers
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token, deny access
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user from payload
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Invalid token', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;