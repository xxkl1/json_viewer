import http from 'http';
var postData = JSON.stringify({
    message: 'Hello World!'
});
var options = {
    hostname: 'localhost',
    port: 3000,
    path: '/send',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};
var req = http.request(options, function (res) {
    console.log("statusCode: ".concat(res.statusCode));
    res.on('data', function (data) {
        console.log(data.toString());
    });
});
req.on('error', function (error) {
    console.error(error);
});
req.write(postData);
req.end();
