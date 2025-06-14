// Least Time Remaining спрямовує кожний новий запит на той сервер,
// у якого найменша оцінена сукупна тривалість обробки всіх поточних з’єднань
// (тобто activeConnections × avgResponseTime найменше).

// Список серверів (бекендів)
const servers = [
    { name: 'A', activeConnections: 0, avgResponseTime: 120 },
    { name: 'B', activeConnections: 0, avgResponseTime: 100 },
    { name: 'C', activeConnections: 0, avgResponseTime: 150 },
];

// Обираємо сервер з найменшою сукупною тривалістю обробки поточних з'єднань
function pickServers() {
    let target = servers[0];
    let minRemaining = target.activeConnections * target.avgResponseTime;

    for (const srv of servers) {
        let remaining = srv.activeConnections * srv.avgResponseTime;

        if (remaining < minRemaining) {
            minRemaining = remaining;
            target = srv;
        }
    }

    target.activeConnections++;
    return target.name;
}

// Допоміжна функція для імітації завершення з’єднань на всіх серверах (опціонально)
function releaseConnections() {
    servers.forEach(item => {
        if (item.activeConnections > 0) {
            item.activeConnections--;
        }
    });
}

// Кількість запитів для імітації
const totalRequests = 15;

// Імітація обробки запитів
for (let i = 1; i <= totalRequests; i++) {
    console.log(`Request #${i} - ${pickServers()};`);
    // Опціональна умова заверення з'єднань
    if (i % 5 === 0) {
        releaseConnections();
    }
}

