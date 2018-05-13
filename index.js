const express = require('express');
const socket = require('socket.io');
var xssFilters = require('xss-filters');

const app = express();
const server = app.listen(4000, () => {
  console.log('listening to requests on port 4000');
});

// serves static files
app.use(express.static('public'))

const io = socket(server)

// listens for socket connections
io.on('connection', (socket) => {

  // recieves chat message and sends to all sockets
  socket.on('chat', (data) => {
    io.emit('chat', {
      message: xssFilters.inHTMLData(data.message),
      handle: xssFilters.inHTMLData(data.handle)
    })
  });

  socket.on('typing', handle => {
    socket.broadcast.emit('typing', xssFilters.inHTMLData(handle))
  })
})
