const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const config = require('./utils/config');

let PORT = config.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});