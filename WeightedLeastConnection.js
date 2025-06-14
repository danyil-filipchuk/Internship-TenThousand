// Список серверів (бекендів)
const servers = [
    {name: 'Server A', weight: 1, activeConnection: 0},
    {name: 'Server B', weight: 2, activeConnection: 0},
    {name: 'Server C', weight: 1, activeConnection: 0}
];

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

function releaseConnections() {
    servers.forEach(srv => {
        srv.activeConnection = Math.max(0, srv.activeConnection - Math.floor(Math.random() * 2));
    })
}

const totalRequest = 10;

for (let i = 1; i <=totalRequest; i++) {
    console.log(`Request #${i} - ${pickServers()};`);
    if (i % 3 === 0) {
        releaseConnections();
        console.log('Після releaseConnections:', JSON.stringify(servers));
    }
}