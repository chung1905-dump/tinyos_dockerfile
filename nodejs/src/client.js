const strl = 53;
const net = require('net');
const socket = net.createConnection(6789, 'tinyos', () => {
    console.log('connected to server!');
    // client.write('world!\r\n');
});
var input = '';
var hex = '';
socket.on('data', (raw) => {
    input = input + raw.toString();
    if (input.length >= strl) {
        hex = input.substr(0, strl);
        console.log(hex);
        input = input.substr(strl);
    }
});
socket.on('end', () => {
    console.log('disconnected from server');
});

// var app = require('http').createServer();
// var io = require('socket.io')(app);
//
// app.listen(9876);
//
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
