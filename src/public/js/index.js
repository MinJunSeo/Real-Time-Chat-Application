const socket = io();

socket.on('connect', () => {
  const nickname = prompt('Please enter your nickname for chatting.');
  
  if (!nickname) {
    socket.emit('newUser', 'Guest');
  }
  socket.emit('newUser', nickname);
});

socket.on('update', (data) => {
  const chat = document.getElementById('chat-log');

  const message = document.createElement('div');
  const node = document.createTextNode(`${data.nickname}: ${data.message}`);
  const className = data.type;

  message.classList.add(className);
  message.appendChild(node);
  chat.appendChild(message);
});

const send = () => {
  const newMessage = document.getElementById('my-message').value;
  document.getElementById('my-message').value = '';

  const chat = document.getElementById('chat-log');
  const message = document.createElement('div');
  const node = document.createTextNode(newMessage);

  message.classList.add('myMessage');
  message.appendChild(node);
  chat.appendChild(message);

  socket.emit('message', {
    type: 'other',
    message: message
  });
}