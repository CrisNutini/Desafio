const { contas } = require('../bancodedados');

let numeroNovaConta = 100


const criarContas = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

    if (!nome) {
        return res.status(400).json({ mensagem: 'O nome deve ser informado.' });
    }
    if (!cpf) {
        return res.status(400).json({ mensagem: 'O cpf deve ser informado.' });
    }
    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento deve ser informada.' });
    }
    if (!telefone) {
        return res.status(400).json({ mensagem: 'O telefone deve ser informado.' });
    }
    if (!email) {
        return res.status(400).json({ mensagem: 'O email deve ser informado.' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha deve ser informada.' });
    }

    for (let conta of contas) {
        if (conta.cpf === cpf) {
            return res.status(400).json({ mensagem: "Já existe uma conta com o cpf informado!" })
        }
        if (conta.email === email) {
            return res.status(400).json({ mensagem: "Já existe uma conta com o e-mail  informado!" })
        }

    }

    const novaConta = {
        conta: numeroNovaConta,
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha,
        saldo: 0
    }
    contas.push(novaConta);

    numeroNovaConta++

    return res.status(201).json({ mensagm: "Conta criada com sucesso" });
}


module.exports = criarContas