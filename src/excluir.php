<?php
session_start();

include_once("conexao.php");

try {
    if (!isset($_SESSION['usuario_logado']) || !isset($_SESSION['tipo_usuario']) || $_SESSION['tipo_usuario'] != 1) {
        echo json_encode(['success' => false, 'message' => 'Você não tem permissão para excluir usuários.']);
        exit;
    }

    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['id'])) {
        $db = new Connection();

        try {
            $conn = $db->connect();

            if (!$conn) {
                throw new Exception("Erro ao conectar ao banco de dados.");
            }

            $id_usuario = $conn->real_escape_string($data['id']);

            $sql = "DELETE FROM usuarios WHERE id = ?";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bind_param('i', $id_usuario);
                $stmt->execute();

                if ($stmt->affected_rows > 0) {
                    echo json_encode(['success' => true, 'message' => 'Usuário excluído com sucesso.']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Usuário não encontrado ou erro ao excluir.']);
                }
                $stmt->close();
            } else {
                echo json_encode(['success' => false, 'message' => 'Erro ao preparar a consulta de exclusão.']);
            }

            $db->disconnect();
        } catch (Exception $e) {
            echo "Erro: " . $e->getMessage();
        }

    } else {
        echo json_encode(['success' => false, 'message' => 'ID do usuário não fornecido.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Erro: ' . $e->getMessage()]);
}

?>
