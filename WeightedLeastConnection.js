// Алгоритм Weighted Least Connections спрямовує новий запит на той сервер, у якого найменше співвідношення активних з’єднань до його ваги

// Список серверів (бекендів)
const servers = [
    {name: 'Server A', weight: 1, activeConnection: 0},
    {name: 'Server B', weight: 2, activeConnection: 0},
    {name: 'Server C', weight: 1, activeConnection: 0}
];

// Знаходимо сервер з мінімальним співвідношенням activeConnections/weight серед усіх серверів
function pickServers() {
    let target = servers[0];
    let minRatio = target.activeConnection / target.weight;

    for (const srv of servers) {
        const ratio = srv.activeConnection / srv.weight;
        if (ratio < minRatio) {
            minRatio = ratio;
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
const totalRequest = 10;
console.log('Початковий стан серверів:', JSON.stringify(servers));

// Імітація обробки запитів
for (let i = 1; i <=totalRequest; i++) {
    console.log(`Request #${i} - ${pickServers()};`);
    // Опціональна умова заверення з'єднань
    if (i % 3 === 0) {
        releaseConnections();
        console.log('Після releaseConnections:', JSON.stringify(servers));
    }
}