function reais_to_decimal($brl, $casasDecimais = 2){

  // Se já estiver no formato USD, retorna como float e formatado
  if(preg_match('/^\d+\.{1}\d+$/', $brl))
  return (float) number_format($brl, $casasDecimais, '.', '');
  // Tira tudo que não for número, ponto ou vírgula
  $brl = preg_replace('/[^\d\.\,]+/', '', $brl);
  // Tira o ponto
  $decimal = str_replace('.', '', $brl);
  // Troca a vírgula por ponto
  $decimal = str_replace(',', '.', $decimal);
  return (float) number_format($decimal, $casasDecimais, '.', '');

}
