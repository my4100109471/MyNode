const mysql = require('mysql');
const { callbackify } = require('util');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abc',
    database: 'my'
});

function executeQuery(callback, beforeCallBack, path, req, response, strSql, sqlParameters = []) {
    var a;
    connection.connect();
    connection.query(strSql, sqlParameters, function (error, results) {
        if (error) throw error;
        callback(results, path, req, response, beforeCallBack);
    });
    connection.end();
}

module.exports = executeQuery;