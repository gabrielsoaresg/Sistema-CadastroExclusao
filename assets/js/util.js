import { validarEmail } from "./validacoes.js";
import { validarSenha } from "./validacoes.js";


export function carregarFooterEHeaders() {
    document.addEventListener("DOMContentLoaded", function () {
        // Carregar o footer
        fetch("../assets/templates/footer.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("footer-placeholder").innerHTML = data;
            })
            .catch(error => console.error("Erro ao carregar o footer:", error));
        fetch("../assets/templates/header.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("header-placeholder").innerHTML = data;
            })
            .catch(error => console.error("Erro ao carregar o header principal:", error));

        fetch("../assets/templates/header-login.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("header-login-placeholder").innerHTML = data;
            })
            .catch(error => console.error("Erro ao carregar o header login:", error));
    });

}

export function exibirMensagem(msg, cor) {
    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = msg;
    mensagemDiv.style.color = cor;
}

export function showOffPassword() {
    const passwordField = document.getElementById("password");
    const toggler = document.getElementById("toggler");

    if (passwordField.type === "password") {
        passwordField.type = "text";  // Torna o campo visível
        toggler.classList.remove("bi-eye-slash"); // Troca o ícone
        toggler.classList.add("bi-eye");
    } else {
        passwordField.type = "password";  // Torna o campo oculto
        toggler.classList.remove("bi-eye"); // Troca o ícone
        toggler.classList.add("bi-eye-slash");
    }

}

export async function cadastrarUsuario() {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('password').value;

    if (!nome || !email || !senha) {
        exibirMensagem('Todos os campos são obrigatórios!', 'red');
        return;
    } else {

        if (!validarEmail(email)) {
            return;
        }


        if (!validarSenha(senha)) {
            return;
        }

        const data = new FormData();
        data.append('nome', nome);
        data.append('email', email);
        data.append('senha', senha);

        try {
            const response = await fetch('../src/salvar.php', {
                method: 'POST',
                body: data
            });

            console.log(response);

            const result = await response.json();

            if (result.success) {
                exibirMensagem('Usuário cadastrado com sucesso!', 'green');
                console.log(result.message);
                document.getElementById('formCadastro').reset();
            } else {
                exibirMensagem('Ocorreu um erro ao cadastrar o usuário', 'red');
                console.log(result.message);
            }

        } catch (error) {
            exibirMensagem("Erro ao cadastrar o usuário!", "red");
            console.log(error);
        }
    }
}

export function exibirDadosTabela() {
    const tabelaUsuarios = document.getElementById('tabela-usuarios').querySelector('tbody');
    tabelaUsuarios.innerHTML = '';
    fetch('../src/lista.php')
        .then(response => response.text())
        .then(text => {
            console.log('Resposta bruta do servidor:', text);
            try {
                const data = JSON.parse(text);
                if (data.error) {
                    throw new Error(data.error);
                }

                if (!data || data.length === 0) {
                    tabelaUsuarios.innerHTML = '<tr><td colspan="3">Nenhum usuário encontrado.</td></tr>';
                    return;
                }

                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.setAttribute('data-id', user.id);

                    row.innerHTML = `
                        <td>${user.nome}</td>
                        <td>${user.email}</td>
                        <td><input type="radio" name="select"></td>
                    `;
                    tabelaUsuarios.appendChild(row);
                });
            } catch (error) {
                console.error('Erro ao interpretar JSON:', error);
                console.log(error);
                tabelaUsuarios.innerHTML = '<tr><td colspan="3">Erro ao carregar dados.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            console.log(error);
            tabelaUsuarios.innerHTML = '<tr><td colspan="3">Erro ao carregar dados.</td></tr>';
        });
}


export function excluirUsuario() {
    const selectedRow = document.querySelector('input[name="select"]:checked');
    if (!selectedRow) {
        exibirMensagem("Selecione um usuário para excluir.", "red");
        return;
    }

    const idUsuarioSelecionado = selectedRow.closest('tr').dataset.id;

    const confirmar = confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmar) {
        return;
    }

    fetch('../src/excluir.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: idUsuarioSelecionado })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            exibirMensagem("Usuário excluído com sucesso!", "green");
            exibirDadosTabela();
        } else {
            exibirMensagem(data.message, "red");
            console.log("Erro ao excluir usuário: " + data.message);
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        exibirMensagem("Erro ao excluir usuário.", "red");
    });
}

export function logout() {
    window.location.href = '../src/logout.php';
}
