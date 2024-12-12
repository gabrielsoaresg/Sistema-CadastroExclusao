<?php
include_once 'conexao.php';

session_start();
header('Content-Type: application/json'); 
try {
    $db = new Connection();
    $conn = $db->connect();

    if (!$conn) {
        echo json_encode(['error' => 'Erro ao conectar ao banco de dados.']);
        exit;
    }

    $sql = "SELECT id, nome, email, idTipoUsuario FROM usuarios";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $dados = [];
        while ($row = $result->fetch_assoc()) {
            $dados[] = $row;
        }
        echo json_encode($dados);
    } else {
        echo json_encode(['error' => 'Nenhum dado encontrado.']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => 'Erro: ' . $e->getMessage()]);
} finally {
    if (isset($conn) && $conn instanceof mysqli) {
        $conn->close();
    }
}
