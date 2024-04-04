$senha = "@digiteasenha"; // Sua senha
$hashed_password = password_hash($senha, PASSWORD_DEFAULT); // Gere o hash da senha

echo "Senha: " . $senha . "<br>";
echo "Hash da Senha: " . $hashed_password . "<br>";

