'use strict';

var socket = io.connect();
var val = document.getElementById('val');

socket.on('message', function (data) {
    val.innerHTML = data.message;
});