var dados = JSON.stringify({ variavel: variavel });

var url = "www.github.com"  

var cabecalho = new Headers({
    "Content-type": "application/application/json; charset=UTF-8",
    "X-Requested-With": "XMLHttpRequest"
});

var opcoes = {  method: 'POST',
                headers: cabecalho,
                mode: 'same-origin',
                cache: 'default',
                body: dados
            };

var requisicao = new Request(url, opcoes);

fetch(requisicao)
.then(response => response.json())
.then(data => { 
  console.log('resposta', data)
})
.catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
});