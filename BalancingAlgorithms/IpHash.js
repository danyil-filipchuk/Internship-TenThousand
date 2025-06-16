// IP Hash використовує хеш від IP-адреси клієнта, щоб завжди маршрутизувати запити від одного й того самого клієнта
// на один і той самий сервер (статичне прив’язування). Плюси — стабільність сесій, мінімум “розкиду” між різними беками;
// мінуси — може бути нерівномірний розподіл, якщо клієнти нерівномірно розподілені за IP.

const servers = ['Server A', 'Server B', 'Server C'];

// Ця функція підсумовує коди всіх символів у рядку (тобто переводимо всі символи URL в числа)
function simpleHash(str) {
    let sum = 0;

    for(let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
}

// Ця функція прив’язує IP до сервера за допомогою функції simpleHash
function pickServer(requestIP) {
    const hash = simpleHash(requestIP);
    const index = hash % servers.length;
    return servers[index];
}

// Для прикладу список IP для використання
const testIps = [
    '192.168.1.10',
    '10.0.0.5',
    '172.16.0.3',
    '192.168.1.10' // той самий IP — має дати той самий сервер
];

// Перебір списку URL
for (const ip of testIps) {
    console.log(`Request for URL ${ip} - ${pickServer((ip))};`);
}

