const socket = new WebSocket('ws://localhost:3000');

const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const joinBtn = document.getElementById('joinBtn');

const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sentBtn');
const chatUi = document.getElementById('chatUI');
const chat = document.getElementById('chat');
const usersList = document.getElementById('users');

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

        if (data.type === 'message') {
            const p = document.createElement('p');
            p.textContent = `${data.username}: ${data.text}`;
            chat.appendChild(p);
        }

        if (data.type === 'users') {
            usersList.innerHTML = '';
            data.users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user;
                usersList.appendChild(li);
            })
        }

    } catch (err) {
        console.error('Помилка парсингу повідомлення:', err);
    }
};
