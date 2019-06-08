var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql');
var bodyParser = require("body-parser");    //<post 방식> => 6~10줄을 추가하고, 1)app.get->app.post로 변경, 2) req.query.~ -> 이걸 req.body.~ 로만 바꿔주면 됨 3)ajax에 get을 post로
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

//-------------modify.html------------//
app.get('/post방식', function(req, res) {
res.sendfile("post방식.html");
});

//--------------0514.html-------------//
app.get('/form', function(req, res) {
res.sendfile("0514.html");
});

//-------------newsList.html------------//
app.get('/newsList', function(req, res) {
res.sendfile("newsList.html");
});

//-------------newsWrite.html------------//
app.get('/newsWrite', function(req, res) {
res.sendfile("newsWrite.html");
});

//-------------newsDelete.html------------//
app.get('/newsDelete', function(req, res) {
res.sendfile("newsDelete.html");
});


//--create table을 먼저 해주어야 하지만 쿼리문이 복잡하니까 HeidiSQL에서 표를 먼저 생성한다.--//

    //--------------insert-------------//
app.get('/insert', function(req, res) {
    var insertQuery = `INSERT INTO news (title, text) VALUES ('a','내용')`
    connection.query(insertQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});

    //--------------select-------------//
app.get('/select', function(req, res) {
    var selectQuery = `select * from news`; //이 줄만 바꿔서 SQL에 실행되게끔 할 것! 여기서 명령어 날려도 HeidiSQL에서 실행됨.
    connection.query(selectQuery, //connection.query라는 함수를 실행시킨 것! selectQuery를 실행한 후, function(err,rows,fields)를 실행히주겠다는 것
        function(err, rows, fields) { //이렇게 어떤 애가 오면 어던애를 보내는 것을 '콜백함수'라고 한다
            if (err) throw err;
            console.log(rows);
            res.send(rows);
        })
});

    //-------------select title-------------//
app.get('/dbSelectTest', function(req, res) {
    var selectQuery = `select title from news`
    connection.query(selectQuery,
        function(err, rows, fields) {
            res.send(rows);
        });
});

    //-------------select------------//
app.get('/dbNews', function(req, res) {
    var selectQuery = `select * from news` //news라는 이름의 표에서 컬럼명 title의 rows를 불러오겠다는 의미(아래 connection실행까지 합쳐서 실행했을때)
    connection.query(selectQuery,
        function(err, rows, fields) {
            res.send(rows);
        });
});

    //-------------insert.ver2------------//
app.get('/insert2', function(req, res) {
    var title = req.query.title;
    var text = req.query.text;
    var writer = req.query.writer;
    var insertQuery = `INSERT INTO news (title, text, writer) VALUES ("${title}", "${text}", "${writer}")`
    console.log(insertQuery);
    connection.query(insertQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});


    //-------------delete------------//
app.get('/deleteAllNews', function(req, res) {
    var deleteQuery = `DELETE FROM news`;
    connection.query(deleteQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});

    //-------------특정 컬럼 delete------------//
app.get('/delOne', function(req, res) {
    var no = req.query.number;    //number가 no로 받아짐
    var deleteQuery = `DELETE FROM news where no = ${no}`;
    console.log(deleteQuery);
    connection.query(deleteQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});

    //-------------update------------//
app.post('/update', function(req, res) {
    var no = req.body.no;
    var updateQuery = `update news set
    title, text, writer = "${req.body.title}", text ="${req.body.text}" where no = ${no}`;
    console.log(updateQuery);
    connection.query(updateQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});
