const socket = io();

socket.on('connect', () => {
  const nickname = prompt('Please enter your nickname for chatting.');
  
  if (!nickname) {
    socket.emit('newUser', 'Guest');
  }
  socket.emit('newUser', nickname);
});

socket.on('update', (data) => {
  const chat = document.getElementById('chat');

  const message = document.createElement('div');
  const node = document.createTextNode(`${data.name}: ${data.message}`);
  const className = data.type;

  message.classList.add(className);
  message.appendChild(node);
  chat.appendChild(message);
});