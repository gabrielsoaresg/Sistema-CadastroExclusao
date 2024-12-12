import * as util from './util.js';

//carrega o footer da página

util.carregarFooterEHeaders();

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('formCadastro');
    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
           util.cadastrarUsuario();
        });
    }
    
    const toggler = document.getElementById("password-toggler");
    if (toggler) {
        toggler.addEventListener("click", util.showOffPassword);
    }

    const tabelaUsuarios = document.getElementById('tabela-usuarios');
    if(tabelaUsuarios) {
        util.exibirDadosTabela();
    }

    const botaoExcluir = document.getElementById('btnExcluir');
    if(botaoExcluir) {
        botaoExcluir.addEventListener('click', util.excluirUsuario);
    }


    const formLogin = document.getElementById("formLogin");
    if(formLogin) {
        formLogin.addEventListener("submit", realizarLogin);
    }

    setTimeout(function() {
        const btnLogout = document.getElementById("logout-btn");
        if (btnLogout) {
            btnLogout.addEventListener("click", util.logout);
        }
    }, 500);
});


function realizarLogin(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("password").value;

    if (!email || !senha) {
        util.exibirMensagem('Todos os campos são obrigatórios!', 'red');
        return;
    }

    let formData = new FormData();
    formData.append("email", email);
    formData.append("senha", senha);

    fetch("../src/verifica_login.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if (data === "admin") {
            window.location.href = "../public/index.html";
        } else if (data === "user") {
            window.location.href = "../public/index.html";
        } else {
            util.exibirMensagem(data, "red");
            console.log(data)
        }
    })
    .catch(error => {
        console.error("Erro na requisição: ", error);
        console.log("erro na requisição: " + error);
    });
}







