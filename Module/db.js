var mssql = require('mssql');
var db = {};
var config = {
    user: 'sa', //用户名
    password: '!&@Swift521',
    server: 'DLC00PF16A43VL\SQLEXPRESS',
    database: 'Test', //数据库名
    port: 1433,
    options: {
        encrypt: true // Use this if you're on Windows Azure  
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};
//执行sql,返回数据.   
db.sql = function (sql, callBack) {
    var connection = new mssql.ConnectionPool(config, function (err) {
        if (err) {
            console.log(err);
            return;
        }
        var ps = new mssql.PreparedStatement(connection);
        ps.prepare(sql, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            ps.execute('', function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                ps.unprepare(function (err) {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                        return;
                    }
                    callBack(err, result);
                });
            });
        });
    });
};

module.exports = db;   