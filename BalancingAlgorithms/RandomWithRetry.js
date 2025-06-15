// Random with Retry випадково обирає сервер для кожного запиту і, якщо обраний виявляється недоступним (не “відповідає”),
// повторює спробу випадковим чином до певної кількості разів, поки не знайде “живий” сервер або не вичерпає ліміти.

// Список серверів (бекендів) зі статусом “живий”/“мертвий”
const servers = [
    { name: 'Server A', isAlive: false },
    { name: 'Server B', isAlive: false },
    { name: 'Server C', isAlive: true },
];

// Обираємо випадковий сервер. Якщо сервер не відповідає (isAlive = false), то робимо ще спробу до maxRetries разів
function pickServer(maxRetries) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const index = Math.floor(Math.random() * servers.length);
        const server = servers[index];

        if(server.isAlive) {
            return server.name;
        }
        console.log(`Attempt ${attempt}: ${server.name} is down, retrying...`);
    }
    return null;
}

// Кількість запитів для імітації
const totalRequests = 10;

for (let i = 1; i <= totalRequests; i++) {
    const chosen = pickServer(5);
    if (chosen) {
        console.log(`Routed to ${chosen}`);
    } else {
        console.log('→ All retries failed: no available server');
    }
}