<?php
ob_start();

include_once 'conexao.php';

header('Content-Type: application/json');

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nome = $_POST['nome'];
        $email = $_POST['email'];
        $senha = $_POST['senha'];
    
        $db = new Connection();
    
        try {
            $conn = $db->connect();
    
            if (!$conn) {
                throw new Exception("Erro ao conectar ao banco de dados.");
            }
    
            $sql = "INSERT INTO usuarios (nome, email, senha, idTipoUsuario) VALUES (?, ?, ?, ?)";
            
            $stmt = $conn->prepare($sql);

            if ($stmt === false) {
                throw new Exception("Erro na preparação da consulta.");
            }
            
            $idTipoUsuario = 2;
            $stmt->bind_param("ssss", $nome, $email, $senha, $idTipoUsuario);
    
            $senha = password_hash($senha, PASSWORD_DEFAULT);
    
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Usuário cadastrado com sucesso!']);
            } else {
                throw new Exception("Erro ao cadastrar o usuário.");
            }
    
            $db->disconnect();
    
        } catch (Exception $e) {
            echo "Erro: " . $e->getMessage();
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Método não permitido.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
