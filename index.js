'use strict';

const os = require('os');
const nodeStatic = require('node-static');
const http = require('http');
const socketIO = require('socket.io');

const fileServer = new(nodeStatic.Server)();
const app = http.createServer(function(req, res) {
  fileServer.serve(req, res);
}).listen(8080, function () {
  console.log('listening on *:8080');
});

const io = socketIO.listen(app);
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
