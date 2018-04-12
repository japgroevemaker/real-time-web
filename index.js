var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var app = express()
var socket = require("socket.io");

var arr = ['Gues the number between 1 and 10', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(arr);

function shuffle(a) {
  var j, x, i;

  for (var i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }

  return a;
}

//static files
app.set('view engine', 'ejs')

app.use(express.static('public'));

app.get("/", function(req, res) {
  res.render("index");
})

var server = app.listen(4000, function() {
  console.log('Executed at port 4000');
});

var io = socket(server);

io.on('connection', function(socket) {
  console.log('Made socket connection', socket.id);

  socket.on('chat', function(data) {
    data.arr = shuffle(arr);
    io.sockets.emit('chat', data);
  });

  socket.on('guessNumber', function(data) {
    console.log('chat');
    io.sockets.emit('guessNumber', data);
  })

  socket.on('typing', function(data){
      socket.broadcast.emit('typing', data)
    });

});
