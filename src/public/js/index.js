const socket = io();

socket.on('connect', () => {
  const nickname = prompt('Please enter your nickname for chatting.');
  
  if (!nickname) {
    socket.emit('newUser', 'Guest');
  }
  socket.emit('newUser', nickname);
});