import { log, loadBody } from './utils.js';
import http from 'http';
import fs from 'fs';
// import ws from 'ws'
var handleIndex = function (request, response) {
    var res = response;
    fs.readFile('./src/index.html', function (err, data) {
        if (err) {
            res.statusCode = 500;
            res.end("error loading index.html: ".concat(err));
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    });
};
var handleSend = function (request, response) {
    loadBody(request, response, function (body) {
        response.statusCode = 200;
        response.end('ok');
    });
};
var createServer = function () {
    var server = http.createServer(function (request, response) {
        var url = request.url;
        if (url === '/') {
            handleIndex(request, response);
        }
        else if (url === '/send') {
            handleSend(request, response);
        }
    });
    server.listen(3000);
};
var __main = function () {
    log('run main');
    createServer();
};
__main();
