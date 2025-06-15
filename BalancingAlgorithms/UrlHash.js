// URL Hash використовує хеш від URL запиту, щоб завжди направляти однакові ресурси на один і той самий сервер.
// Це корисно, якщо, наприклад, ви кешуєте статичні файли на бекендах і хочете зберегти «локальність» запитів до однакових шляхів.

// Список серверів (бекендів)
const servers = ['Server A', 'Server B', 'Server C'];

// Ця функція підсумовує коди всіх символів у рядку (тобто переводимо всі символи URL в числа)
function simpleHash(str) {
    let sum = 0;

    for(let i = 0; i < str.length; i++) {
        sum += str.charCodeAt(i);
    }
    return sum;
}

// Ця функція прив’язує URL до сервера за допомогою функції simpleHash
function pickServer(requestURL) {
    const hash = simpleHash(requestURL);
    const index = hash % servers.length;
    return servers[index];
}

// Для прикладу список URL для використання
const testUrls = [
    '/images/logo.png',
    '/css/main.css',
    '/api/user/123',
    '/images/logo.png' // той самий шлях - тому має бути той самий сервер
];

// Перебір списку URL
for (const url of testUrls) {
    console.log(`Request for URL ${url} - ${pickServer((url))};`);
}