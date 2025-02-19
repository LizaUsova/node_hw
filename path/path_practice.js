const path = require('path');

const relativePath  = 'module_fs/../readme.txt';
const normalizedPath = path.normalize(relativePath);
console.log('Нормалізований шлях:', normalizedPath);

const fileExtension = path.extname(normalizedPath);
console.log('Розширення файлу:', fileExtension);