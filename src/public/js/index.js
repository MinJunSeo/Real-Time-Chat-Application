const socket = io();

socket.on('connect', () => {
  const nickname = prompt('Please enter your nickname for chatting.');
  
  if (!nickname) {
    socket.emit('newUser', 'Guest');
  } else {
    socket.emit('newUser', nickname);
  }
});

socket.on('typing', (data) => {
  const notification = document.querySelector('.notification');

  if (data.numOfTyper - 1) {
    notification.innerHTML = `${data.numOfTyper - 1} besides ${data.nickname} are typing.`;
  } else {
    notification.innerHTML = `${data.nickname} is typing.`
  }
});

socket.on('stop typing', (numOfTyper) => {
  const notification = document.querySelector('.notification');

  if (!numOfTyper) {
    notification.innerHTML = '';
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
        type: 'otherMessage',
        message: input.value
      });

      socket.emit('stop typing');
      input.value = '';
    }
  });
};

const checkTyping = () => {
  const messageInputForm = document.getElementById('messaging-form');
  const input = document.getElementById('my-message').value;

  messageInputForm.addEventListener('keyup', (event) => {
    if (input) {
      socket.emit('typing');
    } else {
      socket.emit('stop typing');
    }
  });
}