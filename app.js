const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Запит: ${req.method} ${req.url}`);
    next();
})

app.get('/', (req, res) => {
    res.send('Привіт з Express.js!')
});

app.get('/user', (req,res) => {
    res.send('User')
})

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`user ID: ${userId}`);
})

app.post('/submit', (req, res) => {
    const {name, email} = req.body;
    res.send(`Отримано дані: Ім'я - ${name}, Електронна пошта - ${email}`)
});

app.use((req, res) => {
    res.status(404).send('Page not found')
});



app.listen(3000, () => {
    console.log('Сервер працює на порту 3000')
})

