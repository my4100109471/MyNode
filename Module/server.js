var express=require('express');
var app =express();
var db = require('./db');  
var bodyParser = require('body-parser'); //引用bodyParser 这个不要忘了写
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });
//写个接口/add
// app.get('/add',function(req,res){ 
//     let name = req.query.vName
//     let no= req.query.cNo
//     let birth = req.query.dBirth
//     let departNo = req.query.cDepartNo
//     let sex = req.query.cSex
//     let phone = req.query.cPhone

    let sss = "Insert  into [Test].[dbo].[App_ServerInfo] Values('ss'，'haha')"  //这里写数据库操作的语句
    db.sql(sss,function(err,result){    //之前封装好的函数，直接调用，就可以操作连接好的数据库了 
        if (err) {  
            return err;  
        } else{
            res.json(result)
        }
    });  
// });
// app.post('/search',function(req,res){    
//     let vName=req.body.vName
//     let cNo= req.body.cNo
//     let sss = `
//     select * from 
//     (select Staff.vName,Staff.cNo,Staff.dBirth,Staff.cSex,Staff.cPhone,Depart.vName as cDepartNo from Staff,Depart where Staff.cDepartNo = Depart.cDepartNo)t 
//     where t.vName like '`+vName+`%' or t.cNo like '%`+cNo+`%' 
//     `
//     db.sql(sss,function(err,result){ 
//         if (err) {  
//             return err;  
//         }
//         res.json(result)
//     }); 
//     res.status(200)
// });
// app.post('/query',function(req,res){
//     console.log(req.stack);
//     console.log(req.body);
//     console.log(req.url);
//     console.log(req.query);
//    res.json(req.body)
// })

//配置服务端口
var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})