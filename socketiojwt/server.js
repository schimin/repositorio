const express   = require('express');
const http      = require('http');
const cors      = require('cors')
const app       = express();

const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
});// NECESSARIO PARA EVITAR O PROBLEMA DE CORS...


io.on('connection', (socket) => {
  console.log('nova conexão', socket)

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
})




function enviar() {
  console.log('enviado ' + new Date())
  io.emit('statusResponse', 'sucesso:' + new Date());
}


server.listen(8080, () => {
  console.log('listening on *:8080');
});


setInterval(enviar, 5000); // APENAS PARA SIMULAR ENVIO DO SERVER PARA O FRONT