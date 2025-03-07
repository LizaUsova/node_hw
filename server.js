const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');

const app = express();

// Middleware для парсингу JSON
app.use(express.json());

// Маршрути аутентифікації
app.use('/api/auth', authRoutes);

// Захищені роутери для постів
app.use('/api/posts', postsRoutes);

// Підключення до MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Підключено до MongoDB');
        // Запуск сервера після успішного підключення до БД
        app.listen(config.port, () => {
            console.log(`Сервер запущено на порті ${config.port}`);
        });
    })
    .catch(err => {
        console.error('Помилка підключення до MongoDB', err);
    });
