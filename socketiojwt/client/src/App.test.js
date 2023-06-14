import React from 'react';
import { createRoot } from 'react-dom';
import { act } from 'react-dom/test-utils';
import io from 'socket.io-client';
import App from './App';

let container = null;
let socket;

beforeEach(() => {
  // Configurar um elemento DOM como alvo para renderizar o componente
  container = document.createElement('div');
  document.body.appendChild(container);

  // Simular uma conexão de cliente com o servidor
  socket = io('http://localhost:3000'); // Substitua pela URL do seu servidor Node.js
});

afterEach(() => {
  // Limpar ao final de cada teste
  document.body.removeChild(container);
  container = null;

  // Desconectar o cliente do servidor
  socket.disconnect();
});

it('recebe a mensagem de status corretamente', (done) => {
  // Mock do evento "status" enviado pelo servidor
  const mockStatus = 'Mensagem de status mockada';

  // Simular a recepção do evento "status" pelo cliente
  socket.on('status', (data) => {
    expect(data).toBe(mockStatus);
    done();
  });

  act(() => {
    createRoot(container).render(<App />);
  });
});

// Adicione mais testes aqui para outras funcionalidades do seu aplicativo
