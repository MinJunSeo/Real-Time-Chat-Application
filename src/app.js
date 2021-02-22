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

const users = {};
const typers = {};

io.on('connection', (socket) => {
  socket.on('newUser', (nickname) => {
    // 사용자 정보 등록
    users[socket.id] = nickname;

    io.emit('update', {
      type: 'join',
      message: nickname + '님이 접속했습니다.'
    });
  });

  socket.on('typing', () => {
    typers[socket.id] = true;

    socket.broadcast.emit('typing', {
      nickname: users[socket.id],
      numOfTyper: Object.keys(typers).length
    });
  });

  socket.on('stop typing', () => {
    delete typers[socket.id];
    socket.broadcast.emit('stop typing', Object.keys(typers).length);
  });

  socket.on('message', (data) => {
    data.nickname = users[socket.id];
    socket.broadcast.emit('update', data);
  });
  
  socket.on('disconnect', () => {
    socket.broadcast.emit('update', {
      type: 'disconnect',
      message: users[socket.id] + '님이 나가셨습니다.'
    });

    delete users[socket.id];
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