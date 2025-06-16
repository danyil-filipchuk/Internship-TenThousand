// Алгоритм Least Connection спрямовує кожен новий запит до того сервера, який наразі обробляє найменше активних з’єднань

// Список серверів (бекендів)
const servers = [
    {name: 'Server A', activeConnection: 0},
    {name: 'Server B', activeConnection: 0},
    {name: 'Server C', activeConnection: 0}
];

// Знаходимо сервер з мінімальною кількістю активних з'єднань
function pickServer() {
    let target = servers[0];

    for (const srv of servers) {
        if (srv.activeConnection < target.activeConnection) {
            target = srv;
        }
    }

    target.activeConnection++;
    return target.name;
}

// Допоміжна функція для імітації завершення запитів (випадково зменшує activeConnection)
function releaseConnections() {
    servers.forEach(srv => {
        srv.activeConnection = Math.max(0, srv.activeConnection - Math.floor(Math.random() * 2));
    })
}

// Кількість запитів для імітації
const totalRequests = 10;
console.log('Стан серверів на початку:', JSON.stringify(servers));

// Імітація обробки запитів
for (let i = 1; i <= totalRequests; i++) {
    console.log(`Request #${i} - ${pickServer()};`);
    if (i % 3 === 0) {
        releaseConnections();
        console.log('Після releaseConnections:', JSON.stringify(servers));
    }
}
