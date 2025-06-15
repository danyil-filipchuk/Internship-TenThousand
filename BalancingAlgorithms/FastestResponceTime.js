// Fastest Response Time активно вимірює «моментальний» час відповіді кожного сервера і віддає новий запит тому бекенду,
// який відповів найшвидше в поточному циклі перевірки

//Список серверів (бекендів)
const servers = [
    { name: 'Server A', lastResponseTime: 0 },
    { name: 'Server B', lastResponseTime: 0 },
    { name: 'Server C', lastResponseTime: 0 },
];

// Імітує реальне вимірювання часу відповіді сервера. Наприклад випадковий час від 50 до 250 мс.
function measureResponseTime(srv) {
    const time = Math.floor(Math.random() * 200) + 50;

    // Зберігаємо останнє значення для статистики (якщо потрібно)
    srv.lastResponseTime = time;

    return time;
}

// Обираємо сервер з найменшим поточним часом відповіді
function pickServer() {
    let fastest = servers[0];
    let bestTime = measureResponseTime(fastest);

    for (const srv of servers) {
        const time = measureResponseTime(srv);

        if (time < bestTime) {
            bestTime = time;
            fastest = srv;
        }
    }

    return fastest.name;
}

const totalRequests = 10;

for (let i = 1; i <= totalRequests; i++) {
    console.log(`\nRequest #${i} - routed to ${pickServer()}`);
}
