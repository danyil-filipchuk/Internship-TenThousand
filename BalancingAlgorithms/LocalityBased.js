// Locality-Based Load Balancing спрямовує запити до географічно (або мережево) найближчого сервера,
// зменшуючи затримки та покращуючи якість обслуговування клієнтів

//Список серверів (бекендів)
const servers = [
    { name: 'US East (Virginia)', lat: 37.4316, lon: -78.6569 },
    { name: 'Europe West (Frankfurt)', lat: 50.1109, lon: 8.6821 },
    { name: 'Asia East (Tokyo)', lat: 35.6895, lon: 139.6917 },
];

// Функція обчислює «велику окружність» (haversine) відстань між двома точками на Землі
function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = deg => (deg * Math.PI) / 180; // стрілкова функція, в ній переводимо градуси у радіани, а Math.PI — це константа π (3,14...)
    const R = 6371; // радіус Землі в км, у У формулі Гаверсіна множимо кутову відстань (в радіанах) на цей радіус, щоб отримати фактичну відстань у кілометрах

    const dLat = toRad(lat2 - lat1); // Обчислюємо різницю широт (у градусах) між точками і переводимо цю різницю в радіани
    const dLon = toRad(lon2 - lon1); // Обчислюємо різницю довгот (у градусах) між точками і переводимо цю різницю в радіани

    // Обсислюємо половину різниці широт, синус цього кута, підносимо результат до квадрату та обчислюємо косинуси початкової і кінцевої широти (в радіанах)
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    // Беремо квадратні корені, знаходимо кут (в радіанах) між віссю X і вектором, множимо на 2 — отримуємо кутову відстань c між точками (в радіанах)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Перетворюємо кутову відстань (радіани) на лінійну відстань, повертаємо результат у кілометрах
}

// Обирає сервер згідно з координатами клієнта
function pickServer(clientLat, clientLon) {
    let closest = servers[0];
    let minDest = haversineDistance(clientLat, clientLon, closest.lat, closest.lon);

    for (const srv of servers.slice(1)) {
        const dist = haversineDistance(clientLat, clientLon, srv.lat, srv.lon);

        if (dist < minDest) {
            minDest = dist;
            closest = srv;
        }
    }
    return closest.name;
}

const testClients = [
    { lat: 40.7128, lon: -74.0060, label: 'New York, USA' },
    { lat: 48.8566, lon: 2.3522, label: 'Paris, France' },
    { lat: 35.6762, lon: 139.6503, label: 'Tokyo, Japan' },
    { lat: -33.8688, lon: 151.2093, label: 'Sydney, Australia' }
];

for (const client of testClients) {
    console.log(`${client.label} - ${pickServer(client.lat,client.lon)}`);
}