var log = console.log.bind(console);
var loadBody = function (request, response, callback) {
    var req = request;
    var chunks = [];
    req.on('data', function (chunk) {
        chunks.push(chunk);
    }).on('end', function () {
        var body = Buffer.concat(chunks);
        callback(body);
    });
};
export { log, loadBody, };
