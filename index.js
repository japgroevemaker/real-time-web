var express = require('express');
var socket = require("socket.io");

//APP setup
var app = express();
var server = app.listen(4000, function() {
  console.log('Executed at port 4000');
})

//static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket) {
  console.log('Made socket connection', socket.id);

  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  })
});
