var express = require('express');
var app = express();

var server = require('http').Server(app);
var io =require('socket.io')(server);

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 1234;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket)
{
    console.log("Client has connected");

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });

    socket.on('theSwitch', function (data) {
      console.log(data.status);
      io.sockets.emit('theSwitch', {status: data.status});
    });

    socket.on('theLed', function(data) {
      console.log(data);
      io.sockets.emit('theLed', {status: data.status});
    });

});

server.listen(port, function() {
  //var host = http.address().address
  //var port = http.address().port
  //console.log("Server running on http://%s:%s", host, port)
});
