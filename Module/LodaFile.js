const fs = require('fs');
const url = require('url');
const testDb = require('../Module/TestDb')
const queryString = require('querystring');
let databaseResult = "";

function abc(databaseResult, path, req, response, callback) {
    fs.readFile(path, (err, data) => {
        if (err) {
            callback(req, response, err.toString());
        }
        else {
            let htmlContent = data.toString();
            if (htmlContent.indexOf('<table$') >= 0 && !!databaseResult) {
                htmlContent = htmlContent.replace('<table$ style="display:none;" />', "<div style='border:1px solid red; width:200px; height:200px; overflow:scroll;'>" + JSON.stringify(databaseResult) + "</div>")
            }
            response.write(htmlContent);
            response.end();
        }
    });
}

module.exports = {
    loadFile: function (path, req, response, callback) {
        // get 方式
        // const parameters = url.parse(req.url, true).query;
        // if (!!parameters && parameters.name!='') {
        //      console.log(parameters.name);
        // }
        // POST 方式
        let postParameters = '';
        req.on('data', function (chunk) {
            postParameters += chunk;
        });
        req.on('end', function () {
            postParameters = queryString.parse(postParameters);
            if (!!postParameters && !!postParameters.name) {
                console.log('postParameters', postParameters);
                const strInsert = "INSERT INTO `my`.`test`(`Name`)VALUES(?);"
                const sqlParameter = [JSON.stringify(postParameters)];
                testDb(abc, callback, path, req, response, strInsert, sqlParameter);
            }
            else {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        callback(req, response, err.toString());
                    }
                    else {
                        response.write(data);
                        response.end();
                    }
                });
            }
        });
    },
    loadImg: function (path, req, response) {
        fs.readFile(path, 'binary', function (err, file) {
            if (err) {
                console.log(err);
                return;
            } else {
                response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                response.write(file, 'binary');
                response.end();
            }
        });
    }
};