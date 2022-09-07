$dados = array (
		array(
			'id' => 1,
			'nome' => 'Roberto'
			),
		array(
			'id' => 2,
			'nome' => 'Joao'
			),
		array(
			'id' => 3,
			'nome' => 'Rosa'
			),
	);


function searcharray($value, $key, $array) {
		foreach ($array as $k => $val) {
			if ($val[$key] == $value) {
				return $val;
			}
		}
		return null;
}

// USO
$this->searcharray(2, 'id', $dados);
