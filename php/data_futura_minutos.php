<?
$data_informada = "2023-03-16 10:00:00";
$minutos_a_acrescentar = 45;
$timestamp = strtotime($data_informada);
$nova_data = strtotime("+$minutos_a_acrescentar minutes", $timestamp);
$data_formatada = date("Y-m-d H:i:s", $nova_data);
echo $data_formatada;
?>
