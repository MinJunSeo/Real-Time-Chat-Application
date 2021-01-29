const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('user connected.');

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected.');
  });
});

app.use((err, req, res, next) => {
  console.error(
    `message: ${err.message}, status: ${err.status}`
  );
  res.status(err.status || 500).json({
    message: err.message,
    status: err.status
  });
});

http.listen(3000, () => {
  console.log(`Socket Server listing at 3000 port!`);
});