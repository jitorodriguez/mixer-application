"use strict";
exports.__esModule = true;
//Simple function that returns a introduction
function sayHello() {
    return "Hello Mixer!! :)";
}
var express = require("express");
var app = express();
var hostname = '127.0.0.1';
var port = 7000;
//Set up GET for landing page
app.get('/', function (req, res) {
    var intro = sayHello();
    res.send(intro);
});
//Add listen
var server = app.listen(port, function () {
    console.log("Express running -> PORT " + server.address.port);
});
