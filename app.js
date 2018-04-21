'use strict';

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/'));

server.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log(`server is listening on ${port}...`);
});

io.sockets.on('connection', function(socket) {
  // convenience function to log server messages on the client
  function log() {
    const array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('btn_message', function (message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });
});

module.exports = app;