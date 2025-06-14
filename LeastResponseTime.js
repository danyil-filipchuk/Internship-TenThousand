// Алгоритм Least Response Time спрямовує кожен новий запит на той сервер,
// який обробляє запити швидше за інших (має найнижчий середній час відповіді).

// Список серверів (бекендів)
const servers = [
    { name: 'A', avgResponseTime: 0, requestCount: 0 },
    { name: 'B', avgResponseTime: 0, requestCount: 0 },
    { name: 'C', avgResponseTime: 0, requestCount: 0 },
];

// Обираємо сервер з найменшим середнім часом відповіді
function pickServer() {
    let target = servers[0];
    let minTime = target.avgResponseTime;

    for (const srv of servers) {
        if (srv.avgResponseTime < minTime) {
            minTime = srv.avgResponseTime;
            target = srv;
        }
    }
    return target.name;
}

// Оновлюємо статистику середнього часу відповіді для сервера та кількості оброблених запитів
function recordResponseTime(serverName, responseTime) {
    const srv = servers.find(item => item.name === serverName);
    srv.requestCount++;
    // новий середній = (старий * (n–1) + current) / n
    srv.avgResponseTime = (srv.avgResponseTime * (srv.requestCount - 1) + responseTime) / srv.requestCount;
}

// Кількість запитів для імітації
const totalRequests = 10;

// Імітація обробки запитів
for (let i = 1; i <= totalRequests; i++) {
    const time = Math.floor(Math.random() * 200) + 50; // Імітуємо час відповіді (від 50 до 250 мс)
    recordResponseTime(pickServer(), time);

    console.log(`Request #${i} - Server ${pickServer()} responded in ${time}ms`);
}
