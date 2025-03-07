const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (userId) => {
    const accessToken = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '1h' });

    const refreshToken = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '7d' });

    return { accessToken, refreshToken };
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Вкажіть ім’я користувача, email та пароль' });
        }
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Користувач з такими даними вже існує' });
        }
        const user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
        return res.status(201).json({ token, user: { id: user._id, username, email } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: 'Вкажіть email та пароль'});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Невірні дані для входу'});
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({message: 'Невірні дані для входу'});
        }

        const token = jwt.sign({id: user._id}, config.jwtSecret, {expiresIn: '1h'});
        return res.status(200).json({token, user: {id: user._id, username: user.username, email: user.email}});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Помилка сервера'});
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Не надано рефреш токен' });
        }

        jwt.verify(refreshToken, config.jwtSecret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Невірний рефреш токен' });
            }

            const { accessToken, refreshToken: newRefreshToken } = generateToken(decoded.id);

            return res.status(200).json({
                accessToken,
                refreshToken: newRefreshToken
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Помилка сервера' });
    }
};