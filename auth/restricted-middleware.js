const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js');

module.exports = (req, res, next) => {
    const token = req.session.token;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Error: You do not have permission to view this content (Incorrect Credentials)' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'Error: You do not have permission to view this content (Missing Credentials)' });
    }
};
