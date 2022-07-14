// DICAS DE RESPOSTA CURL
  function f_curl(){
  
    /*
    CURLOPT_HTTPHEADER => [
      "Accept: application/json",
      "Content-Type: application/json",
    */ 
      
    $err      = curl_error($curl);
    $response = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $httpurl  = curl_getinfo($curl, CURLINFO_EFFECTIVE_URL);

    $resposta = array (
      "error" => $err,
      "info" => $httpcode,
      "url" => $httpurl,
      "response" => $response
    );

    curl_close($curl);

    return $resposta;
  }
  
  // PEGANDO O RETORNO
  $array = f_curl();
  
  // OBTER O INFO PARA TRATAR COM ERROS
  $array['info'] >= 400
  
  // PARA OBTER O RESPONSE:
  $var = json_decode($array['response'], true);
  
  echo $var['id'];