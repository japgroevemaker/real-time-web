var express = require('express')
var ejs = require('ejs')
var bodyParser = require('body-parser')
var app = express()
var socket = require("socket.io");

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

var random = 0

io.on('connection', function(socket) {
  console.log('Made socket connection', socket.id);
  socket.on('chat', function(data) {
    if (data.message == "/number") {
      random = Math.floor((Math.random() * 10) + 1);
      console.log(random);
      data.message = ` ${data.handle} Set a random number between 1 and 10. Take a /guess !`
      data.handle = "Random Number"
      io.sockets.emit("chat", data)
    }  else if(data.message.includes("/guess")){
      var guess = data.message.split("/guess ")
      var guess = guess[1]
      if (guess != random) {
        data.message = ` ${data.handle} didn't guess the number`
        data.handle = "Random Number"
      } else {
        data.message = ` ${data.handle} guessed the number!`
        data.handle = "Random Number"
      }
      io.sockets.emit("chat", data)

    }
    else {
      io.sockets.emit('chat', data);
    }

  });

  socket.on('guessNumber', function(data) {
    console.log('chat');
    io.sockets.emit('guessNumber', data);
  })

  socket.on('typing', function(data){
      socket.broadcast.emit('typing', data)
    });

});
