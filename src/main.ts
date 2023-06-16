import { log, loadBody } from './utils.js'
import http from 'http'
import fs from 'fs'
// import ws from 'ws'

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

const handleSend = function (
    request: http.IncomingMessage,
    response: http.ServerResponse
) {
    loadBody(request, response, (body) => {
        response.statusCode = 200
        response.end('ok')
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
}

const __main = function () {
    log('run main')
    createServer()
}

__main()
