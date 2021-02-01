const socket = io();

socket.on('connect', () => {
  const nickname = prompt('Please enter your nickname for chatting.');
  
  if (!nickname) {
    socket.emit('newUser', 'Guest');
  } else {
    socket.emit('newUser', nickname);
  }
});

socket.on('update', (data) => {
  const chat = document.getElementById('chat-log');

  const message = document.createElement('div');
  const className = data.type;
  let node = null;
  if (data.nickname) {
    node = document.createTextNode(`${data.nickname}: ${data.message}`);
  } else {
    node = document.createTextNode(`${data.message}`);
  }

  message.classList.add(className);
  message.appendChild(node);
  chat.appendChild(message);
});

const send = () => {
  const messageInputForm = document.getElementById('messaging-form');
  const input = document.getElementById('my-message');

  const chatLog = document.getElementById('chat-log');
  const messageBox = document.createElement('div');
  const node = document.createTextNode(input.value);

  messageBox.classList.add('myMessage');
  messageBox.appendChild(node);
  chatLog.appendChild(messageBox);

  messageInputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value) {
      socket.emit('message', {
        type: 'ohterMessage',
        message: input.value
      });
      input.value = '';
    }
  });
};