//교수님 답안
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/getItem', function (req, res) {   //getItem이란 요청이 들어오면 정렬을 만들라는 거
  var userPrice = Number(req.query.inputPrice);     //주소창에 price = A를 입력했을 때 A를 읽어오겠다는 명령어(속성값)
  var priceTable =              //----위에서 inputPrice가 어딨는겨?????????????
    [{name:"item1", price:1000},
    {name:"item2", price:5000},
    {name:"item3", price:10000},
    {name:"item4", price:30000},
    {name:"item5", price:50000},
    {name:"item6", price:100000},
    {name:"item7", price:500000},
  ];
  var resText = "구매불가";

  for(var i=0;i<priceTable.length;i++) {
    if(priceTable[i].price <= userPrice) {
      resText = priceTable[i].name;
    }
  }
  //response로 resText를 보내주겠다
  res.send(resText);
});

app.get('/item', function (req, res) {
		res.sendfile("item.html");
});

app.get('/1', function (req, res) {
		res.sendfile("app");
});
app.get('/2', function (req, res) {
		res.sendfile("item");
});

app.get('/car', function (req, res) {
		res.sendfile("car.html");
});

app.get('/getCarPrice', function (req, res) {
        var carSelect = req.query.car;
        var colorSelect = req.query.color;
        var carPrice = [2100,1300,1500,3500,3200];
        var colorPrice = [100,120,200,130,80];

		res.send(carPrice[carSelect] + colorPrice[colorSelect] +"만원");
});

app.get('/New', function (req, res) {
		res.sendfile("New.html");
});


//5.14
app.get('/form', function (req, res) {
        res.sendfile("0514.html");
});

app.get('/form', function (req, res) {
    var selectQuery = `select title from news`

    connection.query(selectQuery,
    function (err, rows, fields){
        res.send(rows);
    });
});
