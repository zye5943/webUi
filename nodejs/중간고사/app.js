var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);


app.get('/01', function(req, res){
    res.sendfile("01_for문.html");
});

app.get('/02', function(req, res){
    res.sendfile("02_double곱하기.html");
});
app.get('/03', function(req, res){
    res.sendfile("03_idPassWord.html");
});

app.get('/style', function(req, res){
    res.sendfile("style.html");

});

app.get('/true', function(req, res){
    res.sendfile("true.html");
});

app.get('/0402_idpassword', function(req, res){
    res.sendfile("0402_idpassword.html");
});


app.get('/a', function(req, res){
    res.sendfile("a.html");
});


app.get('/NewFileSystem', function(req, res){
    res.sendfile("NewFileSystem.html");
});

app.get('/0402_double', function(req, res){
    res.sendfile("02_double곱하기.html");
});

app.get('/login', function(req, res){
    res.sendfile("login.html");
});

app.get('/array', function(req, res){
    res.sendfile("array.html");
});

app.get('/gugudan', function(req, res){
    res.sendfile("gugudan.html");
});

app.get('/array2', function(req, res){
    res.sendfile("array2.html");
});

app.get('/instance', function(req, res){
    res.sendfile("instance.html");
});

app.get('/inputN', function(req, res){
    res.sendfile("inputN.html");
});

app.get('/AllUp', function(req, res){
    res.sendfile("AllUp.html");
});

app.get('/hello', function(req, res){
    res.sendfile("hello.html");
});

app.get('/midterm', function(req, res){
    res.sendfile("midterm.html");
});
