import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080'); 
socket.on('connect', () => console.log('Nova conexão'));

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('statusResponse', (message) => {
      console.log('ME AVISA SOCKET IO: ', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
   
  }, []);

  return (
    <div className="App">
      <h1>Aplicativo React.js</h1>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}

export default App;
