FUNÇÕES PARA CONVERSÃO DE MOEDA EM PT-BR PARA US
/ CONVERTE PREÇO NO FORMATO 10.000.000,51 PARA 10000000.51
function price_to_number(v){
        if(!v){return 0;}
            v=v.split('.').join('');
            v=v.split(',').join('.');
            return Number(v.replace(/[^0-9.]/g, ""));
    }
// CONVERTE 10000000.51 PARA 10.000.000,51
function number_to_price(v){
	    if(v==0){return '0,00';}
            v=parseFloat(v);
            v=v.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            v=v.split('.').join('*').split(',').join('.').split('*').join(',');
            return v;
}