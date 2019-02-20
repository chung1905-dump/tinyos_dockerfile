const net = require('net');
const client = net.createConnection(6789, 'tinyos', () => {
  // 'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  // client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});

var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(9876);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
