// Slowest Response Time – навмисно відправляє новий запит тому серверу,
// який ще найгірше (найдовше) відповідає,щоб «розвантажити» швидші вузли.

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

// Обираємо сервер з найбільшим поточним часом відповіді
function pickServer() {
    let slowest = servers[0];
    let worstTime = measureResponseTime(slowest);

    for (const srv of servers.slice(1)) {
        const time = measureResponseTime(srv);

        if (time > worstTime) {
            worstTime = time;
            slowest = srv;
        }
    }

    return slowest.name;
}

const totalRequests = 10;

for (let i = 1; i <= totalRequests; i++) {
    console.log(`\nRequest #${i} - routed to ${pickServer()}`);
}
