'use strict';

var socket = io.connect();
var sendBtn = document.getElementById('sendIt');
var val = document.getElementById('val');

// Attach event handlers
sendBtn.addEventListener('click', function () {
  var data = {
    message: "Hello from the other side."
  };
  sendData(data);
});

/**
* Send message to signaling server
*/
function sendData(message) {
  console.log('Client sending message: ', message);
  socket.emit('btn_message', message);
}