# EXEMPLO DE USO PRATICO PARA USO DE SOCKET.IO

## SERVIDOR EM NODE.JS/ EXPRESS
## FRONT EM REACT.JS

Simples exemplo de envio de informações do backend para o frontend, com a missão de pular etapas iniciais e ir direto ao codigo.

### FUNÇÕES:

- connection > detecta uma conexão
```
io.on('connection', (socket) => {
  console.log('nova conexão')
})
```


- emit > envia ao front
```
io.emit('statusResponse', 'Status recebido com sucesso! ' + new Date());
``` 

- disconect > avisa a desconexão
```
io.on('disconnect', () => {
    console.log('user disconnected');
  });
```
