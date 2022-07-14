<?php
// converte um formato de data americano para um formato de data brasileiro
function data_us_to_br($dataUsa){
	
	if($dataUsa){
	$ano =substr($dataUsa,0,4);
	$mes =substr($dataUsa,5,2);
	$dia =substr($dataUsa,8,2);
	
	$dataBR = $dia."/".$mes."/".$ano;
	
	return $dataBR;
	}
	else{
		return null;
	}
}
// converte um formato de data americano para um formato de data brasileiro
function data_us_to_br2($dataUsa){

    if($dataUsa){
        $ano =substr($dataUsa,0,4);
        $mes =substr($dataUsa,5,2);
        $dia =substr($dataUsa,8,2);

        $ano = date('y',strtotime($ano));
        $dataBR = $dia."/".$mes."/".$ano;

        return $dataBR;
    }
    else{
        return null;
    }
}
// converte um formato de data brasileiro para um formato de data americano
function data_br_to_us($dataBR){
	
	if($dataBR){
	$ano =substr($dataBR,6,4);
	$mes =substr($dataBR,3,2);
	$dia =substr($dataBR,0,2);
	
	$dataUSA = $ano."-".$mes."-".$dia;
	
	return $dataUSA;
	}
	else{
		echo "data vazia";exit;
	}
}
// converte um formato decimal para o formato de moeda
function decimal_to_reais($data){
	
	if($data){
		$data = str_replace(',','', $data);
		$data = str_replace('.',',', $data);
		
		return $data;
		
	}
	else{
		return NULL;
		
	}
}
// converte um formato de moeda brasileira para decimal
function reais_to_decimal($data){
	if($data){
		$data = str_replace('.','', $data);
		$data = str_replace(',','.', $data);
		
		return $data;
		
}
	else{
		return NULL;
		
	}
}
// converte um formato de moeda brasileira com R$ para decimal 
function reais_to_decimal_r($data){
	if($data){
		$data = str_replace('.','', $data);
		$data = str_replace(',','.', $data);
		$data = str_replace('R$','', $data);
		return $data;
		
}
	else{
		return NULL;
		
	}
}
// converte valor decimal para reais com simbolo R$
function decimal_to_reais_r($data){
	
	if($data){
		$data = number_format($data, 2, ',', '.');
		$data = 'R$ ' . $data;
		return $data;
		
	}
	else{
		return NULL;
		
	}
}
if ( ! function_exists('formata_preco'))
{
	// Função para converter um valor em preço real R$
	function formata_preco($valor)
	{
		$negativo = false;
		$preco = "";
		$valor = intval(trim($valor));
		if ($valor < 0) {
		$negativo = true;
		$valor = abs($valor);
	}
		$valor = strrev($valor);
		while (strlen($valor) < 3) {
		$valor .= "0";
	}
	for ($i = 0; $i < strlen($valor); $i++) {
		if ($i == 2) {
			$preco .= ",";
		}
		if (($i <> 2) AND (($i+1)%3 == 0)) {
			$preco .= ".";
		}
			$preco .= substr($valor, $i , 1);
		}
			$preco = strrev($preco);
			return ($negativo ? "-" : "") . $preco;
	}
	// Função para descobrir o dia da semana de uma data
	function diasemana($data) {
        $ano =  substr("$data", 0, 4);
        $mes =  substr("$data", 5, -3);
        $dia =  substr("$data", 8, 9);

        $diasemana = date("w", mktime(0,0,0,$mes,$dia,$ano) );

        switch($diasemana) {
                case"0": $diasemana = "Domingo";           break;
                case"1": $diasemana = "Segunda-Feira"; break;
                case"2": $diasemana = "Terca-Feira";   break;
                case"3": $diasemana = "Quarta-Feira";  break;
                case"4": $diasemana = "Quinta-Feira";  break;
                case"5": $diasemana = "Sexta-Feira";   break;
                case"6": $diasemana = "Sabado";         break;
        }

        return "$diasemana";
		//uso diasemana("1985-03-30");
	}
	//FORMATA DATA COMO TIMESTAMP
      function dataToTimestamp($data){
        $ano =  substr("$data", 0, 4);
        $mes =  substr("$data", 5, -3);
        $dia =  substr("$data", 8, 9);
      return mktime(0, 0, 0, $mes, $dia, $ano);  
      } 
    //SOMA 1 DIA  
	function soma1dia($data){
        
        $ano =  substr("$data", 0, 4);
        $mes =  substr("$data", 5, -3);
        $dia =  substr("$data", 8, 9);
      	
      	return date("Y-m-d", mktime(0, 0, 0, $mes, $dia+1, $ano));
	}
	//Função para mostrar uma data em extenso em portugues PT-BR
    function extenso($valor = 0, $maiusculas = false) {
	    if(!$maiusculas){
	        $singular = ["centavo", "real", "mil", "milhão", "bilhão", "trilhão", "quatrilhão"];
	        $plural = ["centavos", "reais", "mil", "milhões", "bilhões", "trilhões", "quatrilhões"];
	        $u = ["", "um", "dois", "três", "quatro", "cinco", "seis",  "sete", "oito", "nove"];
	    }else{
	        $singular = ["CENTAVO", "REAL", "MIL", "MILHÃO", "BILHÃO", "TRILHÃO", "QUADRILHÃO"];
	        $plural = ["CENTAVOS", "REAIS", "MIL", "MILHÕES", "BILHÕES", "TRILHÕES", "QUADRILHÕES"];
	        $u = ["", "um", "dois", "TRÊS", "quatro", "cinco", "seis",  "sete", "oito", "nove"];
	    }

	    $c = ["", "cem", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
	    $d = ["", "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
	    $d10 = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezesete", "dezoito", "dezenove"];

	    $z = 0;
	    $rt = "";

	    $valor = number_format($valor, 2, ".", ".");
	    $inteiro = explode(".", $valor);
	    for($i=0;$i<count($inteiro);$i++)
	    for($ii=strlen($inteiro[$i]);$ii<3;$ii++)
	    $inteiro[$i] = "0".$inteiro[$i];

	    $fim = count($inteiro) - ($inteiro[count($inteiro)-1] > 0 ? 1 : 2);
	    for ($i=0;$i<count($inteiro);$i++) {
	        $valor = $inteiro[$i];
	        $rc = (($valor > 100) && ($valor < 200)) ? "cento" : $c[$valor[0]];
	        $rd = ($valor[1] < 2) ? "" : $d[$valor[1]];
	        $ru = ($valor > 0) ? (($valor[1] == 1) ? $d10[$valor[2]] : $u[$valor[2]]) : "";

	        $r = $rc.(($rc && ($rd || $ru)) ? " e " : "").$rd.(($rd &&
	        $ru) ? " e " : "").$ru;
	        $t = count($inteiro)-1-$i;
	        $r .= $r ? " ".($valor > 1 ? $plural[$t] : $singular[$t]) : "";
	        if ($valor == "000")$z++; elseif ($z > 0) $z--;
	        if (($t==1) && ($z>0) && ($inteiro[0] > 0)) $r .= (($z>1) ? " de " : "").$plural[$t];
	        if ($r) $rt = $rt . ((($i > 0) && ($i <= $fim) && ($inteiro[0] > 0) && ($z < 1)) ? ( ($i < $fim) ? ", " : " e ") : " ") . $r;
	    }

	    if(!$maiusculas){
	        $return = $rt ? $rt : "zero";
	    } else {
	        //if ($rt) $rt = preg_replace(" E "," e ",ucwords($rt));
	        if ($rt) $rt = preg_replace("/E/","e",ucwords($rt));
	            $return = ($rt) ? ($rt) : "Zero" ;
	    }

	    if(!$maiusculas){
	        //return preg_replace(" E "," e ",ucwords($return));
	        return preg_replace("/E/","e",ucwords($return));
	    }else{
	        return strtoupper($return);
	    }
	}
	// Função para formatar CEP no Brasil
    function formata_CEP($numero)
    {
        $numero = preg_replace("[' '-./ t]", '', $numero);
        $valor  = str_pad(preg_replace('[^0-9]', '', $numero), 7, '0', STR_PAD_LEFT);
        return preg_replace('/^(\d{2})(\d{3})(\d{3})$/', '$1.$2-$3', $valor);
	}
	//Função para formatar CPF ou CNPJ e retorna a mascara correta
    function formatarCPF_CNPJ($campo, $formatado=TRUE)
    {
        # retira formato
        $codigoLimpo = preg_replace("[' '-./ t]", '', $campo);

        # pega o tamanho da string menos os digitos verificadores
        $tamanho = (strlen($codigoLimpo) -2);

        # verifica se o tamanho do código informado é válido
        if ($tamanho != 9 && $tamanho != 12)
        {
            return FALSE;
        }

        if ($formatado)
        {
            # seleciona a máscara para cpf ou cnpj
            $mascara = ($tamanho == 9) ? '###.###.###-##' : '##.###.###/####-##';

            $indice = -1;
            for ($i=0; $i < strlen($mascara); $i++)
            {
                if ($mascara[$i]=='#') $mascara[$i] = $codigoLimpo[++$indice];
            }

            #retorna o campo formatado
            $retorno = $mascara;
        }
        else
        {
            //se não quer formatado, retorna o campo limpo
            $retorno = $codigoLimpo;
        }
        return $retorno;

    } # formatarCPF_CNPJ
   
}