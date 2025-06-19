const socket = new WebSocket('ws://localhost:3000');

const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const joinBtn = document.getElementById('joinBtn');

const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sentBtn');
const chatUi = document.getElementById('chatUI');
const chat = document.getElementById('chat');

let username = '';
let room = '';

joinBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    room = roomInput.value.trim();

    if (username && room) {
        socket.send(JSON.stringify({
            type: 'join',
            username,
            room
        }));

        document.getElementById('login').style.display = 'none';
        chatUi.style.display = 'block';
    }
});

sendBtn.addEventListener('click', () => {
    const text = messageInput.value.trim();

    if (text) {
        socket.send(JSON.stringify({
            type: 'message',
            text,
            room,
            username
        }));
        messageInput.value = '';
    }
});

socket.onmessage = event => {
    try {
        const data = JSON.parse(event.data);
        const p = document.createElement('p');
        p.textContent = `${data.username}: ${data.text}`;
        chat.appendChild(p);
    } catch (err) {
        console.error('Помилка парсингу повідомлення:', err);
    }
};

// socket.onmessage = event => {
//     const data = event.data;
//     const p = document.createElement('p');
//     p.textContent = data;
//     chat.appendChild(p);
// };

