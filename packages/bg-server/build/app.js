"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socketio = require("socket.io");
var cors = require("cors");
var chalk = require("chalk");
var debug = require("debug");
var morgan = require("morgan-debug");
var app = express();
var server = new http.Server(app);
var io = socketio(server);
var port = +(process.env.PORT || 4000);
var log = debug('app');
server.listen(port, function () {
    console.log("http://localhost:" + chalk.green(port) + "/");
});
app.use(morgan('http', 'tiny'));
app.use(cors());
app.get('/', function (req, res) {
    res.send('Hello World! Test!');
});
app.get('/api', function (req, res) {
    res.send({ rest: 'api' });
});
io.on('connection', function (socket) {
    var eventName = 'io';
    socket.emit(eventName, { socket: 'connected' });
    socket.on(eventName, function (data) {
        console.log('socket.io', eventName, data);
        io.emit(eventName, { socket: "msg " + data.length });
    });
});
// socket.emit -> current
// socket.broadcast.emit -> everyone except current
// io.broadcast -> everyone
