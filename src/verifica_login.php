<?php
session_start();

include_once("conexao.php");

try {
    if (isset($_POST['email']) && isset($_POST['senha'])) {
        $db = new Connection();

        try {
            $conn = $db->connect();

            if (!$conn) {
                throw new Exception("Erro ao conectar ao banco de dados.");
            }

            $email = $conn->real_escape_string($_POST['email']);
            $senha = $_POST['senha'];

            $sql = "SELECT * FROM usuarios WHERE email = ?";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bind_param('s', $email);
                $stmt->execute();
                $resultado = $stmt->get_result();
                $usuario = $resultado->fetch_assoc();

                if ($usuario) {
                    if (password_verify($senha, $usuario['senha'])) {
                        $_SESSION['usuario_logado'] = $usuario['id'];
                        $_SESSION['tipo_usuario'] = $usuario['idTipoUsuario'];

                        if ($usuario['idTipoUsuario'] == 1) {
                            echo "admin"; // Retorna 'admin' para um administrador
                        } else {
                            echo "user"; // Retorna 'user' para um usuário comum
                        }
                    } else {
                        echo "Credenciais inválidas";
                    }
                } else {
                    echo "Usuário não encontrado.";
                }
                $stmt->close();
            } else {
                echo "Erro ao preparar a consulta: " . $conn->error;
            }
        } catch (Exception $e) {
            echo "Erro: " . $e->getMessage();
        }

        $db->disconnect();
    } else {
        echo "Campos obrigatórios não preenchidos.";
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
