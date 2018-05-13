const socket = io.connect('http://localhost:4000');

let message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      feedback = document.getElementById('feedback'),
      output = document.getElementById('output');

// emit events
btn.addEventListener('click', () => {
  if (message.value.length > 0 && handle.value.length) {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
  }
});

message.addEventListener('keypress', () => {
  if (handle.value.length > 0) {
    socket.emit('typing', handle.value);
  }
});

// listen for events
socket.on('chat', (data) => {
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
  message.value = '';
});

socket.on('typing', handle => {
  feedback.innerHTML = `<p><em>${handle} is typing...</em></p>`
})
