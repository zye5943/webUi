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


/////insert/////
//여기서 실행시키면 db(HeidiSQL)에 표가 만들어짐!
app.get('/insert', function(req, res) {
    var insertQuery = `INSERT INTO news (title, text) VALUES ('a','내용')`
    connection.query(insertQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});

/////show data/////
//db의 내용을 웹 console창에 뜨게 함!
app.get('/select', function(req, res) {
    var selectQuery = `select * from news`; //이 줄만 바꿔서 SQL에 실행되게끔 할 것! 여기서 명령어 날려도 HeidiSQL에서 실행됨.
    connection.query(selectQuery, //connection.query라는 함수를 실행시킨 것! selectQuery를 실행한 후, function(err,rows,fields)를 실행히주겠다는 것
        function(err, rows, fields) { //이렇게 어떤 애가 오면 어던애를 보내는 것을 '콜백함수'라고 한다
            if (err) throw err;
            console.log(rows);
            res.send(rows);
        })
});

//0514.html 실행
app.get('/form', function(req, res) {
    res.sendfile("0514.html");
});

app.get('/dbSelectTest', function(req, res) {
    var selectQuery = `select title from news`
    connection.query(selectQuery,
        function(err, rows, fields) {
            res.send(rows);
        });
});

//newList.html 실행
app.get('/newsList', function(req, res) {
    res.sendfile("newsList.html");
});

app.get('/dbSelectNews', function(req, res) {
    var selectQuery = `select * from news` //news라는 이름의 표에서 컬럼명 title의 rows를 불러오겠다는 의미(아래 connection실행까지 합쳐서 실행했을때)
    connection.query(selectQuery,
        function(err, rows, fields) {
            res.send(rows);
        });

    // connection.query(selectQuery2,
    //     function(err, rows, fields) {
    //         res.send(rows);
    //     });
});


//newsWrite.html 실행
app.get('/newsWrite', function(req, res) {
    res.sendfile("newsWrite.html");
});

// //insert하기
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


//newsDelete.html 실행
app.get('/newsDelete', function(req, res) {
    res.sendfile("newsDelete.html");
});

//dbSelectNews 실행
app.get('/deleteAllNews', function(req, res) {
    var deleteQuery = `DELETE FROM news`;
    connection.query(deleteQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});

//delete행 한줄 실행
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

//update 실행
app.post('/update', function(req, res) {
    var no = req.body.no;
    var updateQuery = `update news set title = "${req.body.title}", text ="${req.body.text}" where no = ${no}`;
    console.log(updateQuery);
    connection.query(updateQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});

app.get('/modify', function(req, res) {
    res.sendfile("modify.html");
});

//5월 28일 (flight.html 실행)
app.get('/flight1', function (req, res) {
        res.sendfile("flight1.html");
});


app.get('/flight2', function (req, res) {
    res.sendfile("flight2.html");
});

app.post('/inputInformation', function (req, res) {
    var flightName = req.body.flightName;
    var aircraftCode = req.body.aircraftCode;
    var departure = req.body.departure;
    var arrival = req.body.arrival;
    var departTime = req.body.departTime;
    var arrivalTime = req.body.arrivalTime;
    var insertQuery = `INSERT INTO flight(flightName, aircraftCode, departure, arrival, departTime, arrivalTime) VALUES ("${flightName}","${aircraftCode}", "${departure}","${arrival}","${departTime}","${arrivalTime}")`
    console.log(insertQuery);
    connection.query(insertQuery,
        function(err, rows, fields) {
            res.send(rows);
    });
});

app.get('/selectFlight', function(req, res) {
    var selectQuery = `select * from flight A, aircraft B where a.${no} = b.${no}`
    connection.query(selectQuery,
        function(err, rows, fields) {
            res.send(rows);
        });
})

app.get('/flight3', function (req, res) {
        res.sendfile("flight3.html");
});


//------6월 03일-------//

app.get('/ajax', function (req, res) {
        res.sendfile("ajax.html");
});

var request = require('request');

app.get('/requestTest', function (req, res) {

    request.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930', function(err, response, body){
        body = JSON.parse(body);
        res.send(body.result.areas[1].datas[0].nv+"")
        var price = body.result.areas[1].datas[0].nv+"";
        var insertQuery = `INSERT INTO time( price) VALUES ("${price}")`
        connection.query(insertQuery,
            function(err, rows, fields) {
                console.log(rows);
                res.send(rows);
            });
    });

})

//----insert time----///
app.get('/insertTime', function(req, res) {
    var price = req.query.price;
    var insertQuery = `INSERT INTO time( price) VALUES ("${price}")`
    connection.query(insertQuery,
        function(err, rows, fields) {
            console.log(rows);
            res.send(rows);
        });
});


//.js에 실행되게

// var request = require('request');
// setInterval(function(){
//     request.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930', function(err, response, body){
//         body = JSON.parse(body);
//         var price = body.result.areas[1].datas[0].nv;
//         var q = `insert into time (price) values (${price})`;
//         connection.query(q,
//         function(err,rows,fields){
//             if (err) throw err;
//         }
//     );
//     });
// },1000);


app.get('/chart', function (req, res) {
        res.sendfile("chart.html");
});


// var request = require('request');
//
// app.get('/requestsr',function(req, res){
//     request.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930',function(err, response, dody){
//         body = JSON.parse(body)
//         res.send(body.result.areas[
//
//         ].datas[0].nv+"")
//     })
// });
