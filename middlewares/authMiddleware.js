const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Токен не надано' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
        return res.status(401).json({ message: 'Невірний формат токену' });
    }

    const token = parts[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Невірний токен' });
        }
        req.userId = decoded.id;
        next();
    });
};
