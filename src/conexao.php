<?php
class Connection {
    //variáveis
    private $servername = "localhost";
    private $username = "admin";
    private $password = "root@root1234";
    private $database = "sistema_usuarios";
    private $conn;


    public function connect() {
        try {
            $this -> conn = new mysqli($this->servername, $this->username, $this->password, $this->database);

            if($this->conn->connect_error) {
                throw new Exception("Erro de conexão: " .$this->conn->connect_error);
            }
            return $this->conn;

        } catch (Exception $e) {
            echo "Erro ao conectar ao banco de dados: " .$e->getMessage();
            return null;
        }
    }

    public function disconnect() {
        if ($this->conn && $this->conn instanceof mysqli) {
            $this->conn->close();
            $this->conn = null;
        }
    }

}

?>