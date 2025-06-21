
// Імпорти потрібних модулів (
const express = require('express'); // для обробки HTTP (і роздачі frontend файлів)
const http = require('http'); // стандартний Node.js HTTP-сервер, потрібен для роботи ws
const WebSocket = require('ws'); // бібліотека WebSocket-сервера
const path = require('path'); // для коректної побудови шляху до папок

const app = express();
const server = http.createServer(app); // HTTP-сервер
const wss = new WebSocket.Server({server}); // WebSocket-сервер, який підключений до цього ж HTTP сервера (щоб вони працювали на одному порту 3000)

// Видача фронтенд-файлів, все що є в папці frontend - треба роздавати як статичні файли
app.use(express.static(path.join(__dirname, 'frontend' )));

// Функція, яка виводить список онлайн користувачів у кімнаті
function onlineUsers(room) {
    const users = [];
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.room === room && client.username) {
            users.push(client.username);
        }
    });

    const usersToSend = (JSON.stringify({
        type: 'users',
        users
    }));

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN && client.room === room) {
            client.send(usersToSend);
        }
    });
}

// Коли хтось із клієнтів підключився до сервера через WebSocket — створюється нове ws з'єднання
wss.on('connection', (ws) => {
    console.log('Новий клієнт підключився');

    // Далі слухаємо вхідні повідомлення
    ws.on('message', (message) => {
        let data;

        try {
            data = JSON.parse(message); // Перетворюємо повідомлення з JSON
        } catch (err) {
            console.log('Помилка JSON:', err);
            return;
        }

        // Якщо це тип "join", то ми просто запам’ятовуємо дані про користувача в об’єкті ws
        if (data.type === 'join') {
            ws.username = data.username;
            ws.room = data.room;
            onlineUsers(ws.room);
            console.log(`${ws.username} приєднався до кімнати ${ws.room}`);
            return;
        }

        // Якщо це тип "join", то ми формуємо повідолмення та надсилаємо його всім клієнтам,
        // які підключені та знаходяться в тій самій кімнаті
        if (data.type === 'message') {
            const msgToSend = JSON.stringify({
                type: 'message',
                username: ws.username,
                text: data.text
            })

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
                    client.send(msgToSend);}
            });
        }

        if (data.type === 'typing') {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.room === ws.room && client !== ws) {
                    client.send(JSON.stringify({
                        type: 'typing',
                        username: ws.username,
                    }));
                }
            });
        }

        if (data.type === 'stopTyping') {
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.room === ws.room && client !== ws) {
                    client.send(JSON.stringify({
                        type: 'stopTyping',
                        username: ws.username,
                    }));
                }
            });
        }
    });

    // Коли хтось відключається
    ws.on('close', () => {
        if (ws.room) {
            onlineUsers(ws.room);
        }
        console.log(`Клієнт відключився: ${ws.username}`);
    });
})

// Запуск сервера
server.listen(3000, () => {
    console.log('Сервер запущено на http://localhost:3000');
});


