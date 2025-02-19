import http from 'http';

const PORT = 3000;

const server = http.createServer(function (req, res){
    console.log('URL of your page: ' + req.url);
    res.writeHead(200, {"Content-type": "text/plain; charset=utf-8"});
    res.end("hello, Node.js!");
});

server.listen(PORT);
console.log('We are listening port ' + PORT);