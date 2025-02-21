const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const reqPath = parsedUrl.pathname; // Только путь без параметров
    const filePath = path.join(__dirname, reqPath === '/' ? 'index.html' : reqPath);

    console.log(`Метод: ${req.method}, URL: ${req.url}`);

    if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`Data obtained: ${body}`);
        });
        return;
    }

    if (req.method === 'GET') {
        switch (reqPath) {
            case '/':
                fs.readFile('index.html', (err, data) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(err ? '<h1>Main page</h1>' : data);
                });
                return;

            case '/about':
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('About page');
                return;

            case '/contact':
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('Contacts');
                return;

            case '/json':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Hello, JSON!' }));
                return;
        }

        if (Object.keys(query).length > 0) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`You passed the parameters: ${JSON.stringify(query)}`);
            return;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('File is not found');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });

        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page is not found');
});

server.listen(3000, () => {
    console.log('Server is working on port 3000');
});
