const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.use(express.static(path.join(__dirname, 'frontend' )));

wss.on('connection', (ws) => {
    console.log('Новий клієнт підключився');

    ws.on('message', (message) => {
        let data;

        try {
            data = JSON.parse(message);
        } catch (err) {
            console.log('Помилка JSON:', err);
            return;
        }

        if (data.type === 'join') {
            ws.username = data.username;
            ws.room = data.room;
            console.log(`${ws.username} приєднався до кімнати ${ws.room}`);
            return;
        }

        if (data.type === 'message') {
            const msgToSend = JSON.stringify({
                username: data.username,
                text: data.text
            })

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
                    client.send(msgToSend);
                }
            });
        }
    });
    ws.on('close', () => {
        console.log(`Клієнт відключився: ${ws.username} || 'невідомий`);
    });
})

server.listen(3000, () => {
    console.log('Сервер запущено на http://localhost:3000');
});


