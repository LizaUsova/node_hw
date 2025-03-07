module.exports = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/myapp',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret'
};