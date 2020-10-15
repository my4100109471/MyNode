var http = require('http');
var fs = require("fs");
var url = require("url");
var path = require("path");

const jsonMimeType = 'application/json';
http.createServer(function (request, response) {
  var pathname = url.parse(request.url).pathname;
  const jsonName = getRoutePath(pathname);
  if ('/favicon.ico' == pathname) {
    return;
  }

  var extname = path.extname(pathname);
  if ('.json' != extname) {
    response.end('not a json file request\n');
    return;
  }
  try {
    fs.readFile('./Data/jsonConfig.json', (err, data) => {
      if (err) {
        console.log(err);
        response.write(err);
        response.end();
      }
      let currentItem = '';
      const myData = JSON.parse(data);
      myData.Config.forEach(ele => {
        if (ele.JsonName == jsonName.replace('.json', '')) {
          currentItem = ele.Method;
        }
      });
      if (!!currentItem && currentItem.toLocaleLowerCase() == request.method.toString().toLocaleLowerCase()) {
        var filepath = '.' + pathname.toLowerCase();
        console.log("filePath:" + filepath);
        response.writeHead(200, { 'Content-Type': jsonMimeType });
        fs.readFile(filepath, (err, data) => {
          if (err) {
            response.write(err.toString());
            response.end();
          } else {
            response.end(data.toString());
          }
        });
      }
      else {
        response.end('config error or method is error');
      }
    });
  }
  catch (err) {
    response.write(err.toString());
    response.end();
  }
}).listen(8888);

function getRoutePath(pathname) {
  const paras = pathname.split("/");
  return paras[paras.length - 1];
}

console.log('Server running at http://127.0.0.1:8888/');