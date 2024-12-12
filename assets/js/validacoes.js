import { exibirMensagem } from "./util.js";


export function validarEmail(email)  {
    const regexEmail = /^[^@]+@[^@]+\.[^@]+$/;
    if (!regexEmail.test(email)) {
        exibirMensagem('Por favor, digite um email válido!', 'red');
        return false;
    }
    return true;
}

export function validarSenha(senha) {
    if(senha.length < 8) {
        exibirMensagem('A senha deve conter pelo menos 8 caracteres!', 'red');
        return false;
    }
    return true;
}

