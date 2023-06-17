import { log, loadBody } from './utils.js';
import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';
var global = {
    sockets: new Set()
};
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
        global.sockets.forEach(function (s) { return s.send(body.toString()); });
        response.statusCode = 200;
        response.end('ok');
    });
};
var createWebSocket = function (httpServer) {
    var ws = new WebSocketServer({ server: httpServer });
    ws.on('connection', function (socket) {
        global.sockets.add(socket);
        socket.on('close', function () {
            global.sockets.delete(socket);
        });
    });
    ws.on('message', function (data) {
        console.log('received: ', data);
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
    return server;
};
var __main = function () {
    log('run main');
    var httpServer = createServer();
    createWebSocket(httpServer);
};
__main();
