var http = require('http');
var url = require("url");
const route = require('./Module/Route');

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    if ('/favicon.ico' == pathname) {
        return;
    }
    const callBack = function (req, res, info) {
        res.write(info);
        response.end();
    }
    try {
        const myPath = pathname.replace('/', '');
        route[myPath](request, response, callBack);
    }
    catch (err) {
        response.write(err.toString());
        response.end();
    }
}).listen(8888);

function abc(){
    alert(1);
}

console.log('Server running at http://127.0.0.1:8888/');