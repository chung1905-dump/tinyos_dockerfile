const strl = 53;
const net = require('net');
const app = require('http').createServer();
const io = require('socket.io')(app);

var input = '';
var hex = '';

const tcpSocket = net.createConnection(6789, 'tinyos', () => {
    console.log('connected to server!');

    tcpSocket.on('data', (raw) => {
        input = input + raw.toString();
        if (input.length >= strl) {
            hex = input.substr(0, strl);
            console.log(hex);
            input = input.substr(strl);

            io.emit('update', {hex});
        }
    });
    tcpSocket.on('end', () => {
        console.log('disconnected from server');
    });

    app.listen(9876);
});

io.on('connection', (ioSocket) => {
    console.log('connected to browser');
});
