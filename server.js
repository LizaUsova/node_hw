const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    console.log(`метод: ${req.method}, URL: ${req.url}`);

    if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`Data obtained: ${body}`);
        });
    } else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Main</h1>');
    } else if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello, JSON!' }));
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h2>About</h2>');
    } else if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`You passed the parameters: ${JSON.stringify(query)}`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page is not found');
    }
});

server.listen(3000, () => {
    console.log('Server is working on port 3000');
});
