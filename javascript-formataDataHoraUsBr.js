function formataDataHoraUsBr(datacompleta){
		let datar = new Date(datacompleta);
		let dataFormatada = datar.toLocaleDateString('pt-BR');
		let horaFormatada = datar.toLocaleTimeString('pt-BR');
		return dataFormatada + ' ' + horaFormatada;
	}
