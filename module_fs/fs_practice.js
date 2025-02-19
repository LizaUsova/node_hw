const fs = require('fs');

fs.readFile('readme.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('помилка читання файлу', err);
        return;
    }
    console.log('Вміст файлу', data);
});

fs.writeFile('result.txt', 'Додаю текст', err => {
    if(err) {
        console.error('Помилка запису: ', err);
        return;
    }
    console.log('Успішно додано')
})

const fileExists = fs.existsSync('result.txt');

if (fileExists) {
    console.log('Файл result.txt існує!');
} else {
    console.log('Файл result.txt не знайдено.');
}

fs.mkdir('testFolder', (err) => {
    if (err) {
        console.error('Помилка створення папки:', err);
        return;
    }
    console.log('Папку створено');
});