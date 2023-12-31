import http from 'http'

const log = console.log.bind(console)

const loadBody = function (
    request: http.IncomingMessage,
    response: http.ServerResponse,
    callback: (body: Buffer) => void
) {
    const req = request
    const chunks = []
    req.on('data', (chunk) => {
        chunks.push(chunk)
    }).on('end', () => {
        const body = Buffer.concat(chunks)
        callback(body)
    })
}

export {
    log,
    loadBody,
}