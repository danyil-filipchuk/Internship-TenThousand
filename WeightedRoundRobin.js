// У Weighted Round-Robin кожному серверу задається вага, і він потрапляє в розподіл більше разів, ніж інші

// Список серверів (бекендів)
const servers = [
    {name: 'Server A', weight: 1},
    {name: 'Server B', weight: 2},
    {name: 'Server C', weight: 1}
];

// Тут виявиться масив, де ім’я кожного сервера повторене рівно стільки разів, скільки його вага. Тобто flatMap “розгортає” новий масив ['A', 'B', 'B', 'C']
    const expandedServers = servers.flatMap(item => Array(item.weight).fill(item.name));

let counter = 0;

// Основна логіка алгоритму в цій функції
function pickServer() {
    const server = expandedServers[counter % expandedServers.length];
    counter++;
    return server;
}

// Кількість запитів для імітації
const totalRequests = 10;

// Імітація обробки запитів
for (let i = 1; i <= totalRequests; i++) {
    console.log(`Request #${i} - ${pickServer()};`);
}