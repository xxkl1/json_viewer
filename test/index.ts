import http from 'http'

const postData = JSON.stringify({
    message: 'Hello World!'
})

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/send',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
}

const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', (data) => {
        console.log(data.toString())
    })
})

req.on('error', (error) => {
    console.error(error)
})

req.write(postData)
req.end()
