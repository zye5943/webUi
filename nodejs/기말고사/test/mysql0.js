var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

//DB(heidi SQL)과 mysql.js를 연결시켜주는 명령어 (연결시켜준뒤 mysql에 있는 내용을 찍어줌)
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'webui'
});



//------6월 03일-------//

app.get('/ajax', function (req, res) {
        res.sendfile("ajax.html");
});

var request = require('request');

// app.get('/requestTest2', function (req, res) {
//
//     request.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930', function(err, response, body){
//         body = JSON.parse(body);
//         res.send(body.result.areas[1].datas[0].nv+"")
//         var price = body.result.areas[1].datas[0].nv+"";
//         var insertQuery = `INSERT INTO time( price) VALUES ("${price}")`
//         connection.query(insertQuery,
//             function(err, rows, fields) {
//                 console.log(rows);
//                 res.send(rows);
//             });
//     });
// })

app.get('/requestTest2', function (req, res) {

    request.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930', function(err, response, body){
        body = JSON.parse(body);
        var price = body.result.areas[1].datas[0].nv+"";
        var insertQuery = `INSERT INTO time( price) VALUES ("${price}")`
        connection.query(insertQuery,
            function(err, rows, fields) {
                console.log(rows);
                res.send(rows);
            });
    });
})

app.get('/chart2', function (req, res) {
        res.sendfile("chart2.html");
});
