const express   = require('express');
const http      = require('http');
const cors      = require('cors')
const app       = express();
const jwt       = require('jsonwebtoken');

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

  socket.on('authenticate', (token) => {
    try {
      const decoded = jwt.verify(token, 'chave_secreta'); // Verificar e decodificar o token JWT usando a chave secreta
      console.log('Usuário autenticado:', decoded);
      // Execute as ações necessárias após a autenticação do usuário
    } catch (err) {
      console.error('Erro ao autenticar usuário:', err);
      // Lidar com o erro de autenticação
    }
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