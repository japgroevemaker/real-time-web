//Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    guessNumber = document.createElement('div');

// Emit events

btn.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', function() {
  socket.emit('typing', handle.value);
})

//Listen for events
socket.on('chat', function(data) {
  checkGuessNumber(data);
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

function checkGuessNumber(data) {
  console.log(data);
    if (data.message.startsWith('/number', 0)) {
      console.log('werkt');
      output.appendChild(guessNumber)
      guessNumber.innerHTML = '<p><i>' + data.arr[0] + '</i></p>';
      console.log(data.arr[0]);
    }
}
