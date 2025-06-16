// У класичному Round-Robin усі сервери рівні й отримують запити по черзі

// Список серверів (бекендів)
const servers = ['Server A', 'Server B', 'Server C', 'Server D', 'Server E'];

let counter = 0;

// Основна логіка алгоритму в цій функції
function pickServer() {
    const server = servers[counter % servers.length];
    counter++;
    return server;
}

// Кількість запитів для імітації
const totalRequests = 10;

// Імітація обробки запитів
for (let i = 1; i <= totalRequests; i++) {
    console.log(`Request #${i} - ${pickServer()};`)
}

