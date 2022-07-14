function alert_simples_retorno(title,text,icon){
  // usar plugin swal
		swal({
			title: title,
			text: text,
			icon: icon,
			closeOnClickOutside: true,
			closeOnEsc: false,
		})
		.then((res) => {
			console.log('resultado', res);
				if(res == true){
					console.log('confirmed');
					// executa função;
				}
		});
	
	}
