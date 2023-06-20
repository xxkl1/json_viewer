import { log, loadBody } from './utils.js'
import http from 'http'
import fs from 'fs'
import { WebSocketServer } from 'ws'
import type { WebSocket } from 'ws'

const global = {
    sockets: new Set<WebSocket>()
}

/**
 * load index.html
 * @param request
 * @param response
 */
const handleIndex = function (
    request: http.IncomingMessage,
    response: http.ServerResponse
) {
    const res = response
    fs.readFile('./src/index.html', (err, data) => {
        if (err) {
            res.statusCode = 500
            res.end(`error loading index.html: ${err}`)
            return
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(data)
    })
}

/**
 *
 * @param request
 * @param response
 */
const handleSend = function (
    request: http.IncomingMessage,
    response: http.ServerResponse
) {
    loadBody(request, response, (body) => {
        global.sockets.forEach((s) => s.send(body.toString()))
        response.statusCode = 200
        response.end('ok')
    })
}

const createWebSocket = function (httpServer: http.Server) {
    const ws = new WebSocketServer({ server: httpServer })

    ws.on('connection', (socket) => {
        global.sockets.add(socket)
        socket.on('close', () => {
            global.sockets.delete(socket)
        })
    })

    ws.on('message', (data) => {
        console.log('received: ', data)
    })
}

const createServer = function () {
    const server = http.createServer((request, response) => {
        const url = request.url
        if (url === '/') {
            handleIndex(request, response)
        } else if (url === '/send') {
            handleSend(request, response)
        }
    })
    server.listen(3000)
    return server
}

const __main = function () {
    log('run server at http://localhost:3000')
    const httpServer = createServer()
    createWebSocket(httpServer)
}

__main()
