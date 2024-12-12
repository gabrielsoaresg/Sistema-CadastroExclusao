CREATE DATABASE IF NOT EXISTS sistemas_usuarios;

USE sistemas_usuarios;


CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idTipoUsuario INT,
    FOREIGN KEY (idTipoUsuario) REFERENCES tipo_usuario(idTipoUsuario)
);



CREATE TABLE IF NOT EXISTS tipo_usuario (
    idTipoUsuario INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(255) NOT NULL UNIQUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_criacao VARCHAR(255) NOT NULL
);



INSERT INTO usuarios (nome, email, senha) VALUES
('admin', 'admin@gmail.com', 'admin1234', 1);