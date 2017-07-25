var app = require('express')();
var http = require('http').Server(app);
var WebSocket = require('ws');
var wss = new WebSocket.Server({ server: http });

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var sockets = [];

wss.on('connection', function(ws, req) {
  console.log('a user connected');
  sockets.push(ws);

  ws.on('close', function(evt) {
    console.log('user disconnected');
    sockets.splice(sockets.indexOf(ws), 1);
  });

  ws.on('message', function(msg) {
    console.log('message: ' + msg);
    sockets.forEach(function(socket) {
      socket.send(msg);
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
