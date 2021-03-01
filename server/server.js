var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname + '/public'))

io.on('connection', function(socket){
  console.log('a user connected')

  socket.emit('connected', 'connected success')
})

http.listen(3333, function(){
  console.log('listen on : 3333');
})