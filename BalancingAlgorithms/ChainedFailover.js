// Chained Failover (ланцюговий фейловер) підтримує послідовність пріоритетних серверів:
// кожен новий запит спочатку надсилається на первинний сервер, і якщо він недоступний,
// автоматично спрацьовує перехід («failover») до другого, потім до третього і так далі,
// поки не знайде живий бекенд або не вичерпає список

// Список серверів (бекендів) зі статусом “живий”/“мертвий”
const servers = [
    { name: 'Primary Server',   isAlive: true },
    { name: 'Secondary Server', isAlive: true },
    { name: 'Tertiary Server',  isAlive: true },
];

// Перевіряємо послідовно кожен сервер і повертаємо першого “живого”
function pickServer() {
    for (const srv of servers) {
        if (srv.isAlive) {
            return srv.name;
        }
        console.log(`${srv.name} is down, trying next...`);
    }
    return null;
}

// Симулюємо випадковий фейловер: інколи “вбиваємо” або “відновлюємо” сервери
function randomizeStatus() {
    servers.forEach(srv => {
        if (Math.random() < 0.2) {
            srv.isAlive = !srv.isAlive;
        }
    })
}

const totalRequests = 10;

for (let i = 1; i <= totalRequests; i++) {
    if (i % 3 === 0) {
        randomizeStatus()
    }
    const chosen = pickServer();
    if (chosen) {
        console.log(`Routed to ${chosen};`);
    } else {
        console.log('→ No available servers (all down)');
    }
}