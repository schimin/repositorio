$.ajax({
	url: 'https://www.endereco.com.br',
	type: 'GET', // tipo de envio (GET/POST)
	dataType: 'json', // converte o resultado para json
	cache: false,
        async: false,
	data: { var1: 'valor1' },
	beforeSend:function(){
		// algo para acionar antes do envio
	}
})
.done(function(res) {
	// quando completo
})
.fail(function(xhr, status, error) {
	var errorMessage = xhr.status + ': ' + xhr.statusText
        console.log('Erro: ', errorMessage)
	// quando falhar
})
.always(function() {
	// sempre executar
});
