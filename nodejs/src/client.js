const strl = 53;
const net = require('net');
const app = require('http').createServer();
const io = require('socket.io')(app);
const hexParser = require('./parseHex');

var input = '';
var hex = '';
var parsedObj = '';

var onTcpReceived = function (raw) {
    input = input + raw.toString();
    if (input.length >= strl) {
        hex = input.substr(0, strl);
        parsedObj = hexParser.parse(hex);
        // parsedObj.time = Date().toLocaleString();

        input = input.substr(strl);

        io.emit('update', parsedObj);
        // console.log(hex);
        console.log(parsedObj);
    }
};

const tcpSocket = net.createConnection(6789, 'tinyos', () => {
    console.log('connected to server!');

    tcpSocket.on('data', onTcpReceived);
    tcpSocket.on('end', () => {
        console.log('disconnected from server');
    });

    app.listen(9876);
});

io.on('connection', (ioSocket) => {
    console.log('connected to browser');
});
