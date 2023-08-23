const { contas } = require('../bancodedados');


const atualizarConta = (req, res) => {
    const numeroDaConta = Number(req.params.numeroConta);

    if (isNaN(numeroDaConta)) {
        return res.status(400).json({ mensagem: 'O número da conta não é válido' })
    }

    let contaEncontrada = contas.find(item => item.conta === numeroDaConta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "O número da conta não existe" });
    }

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

    const filtrarContas = contas.filter(conta => conta !== contaEncontrada)
    for (let conta of filtrarContas) {
        if (conta.cpf === cpf) {
            return res.status(400).json({ mensagem: "O CPF informado já existe cadastrado!" })
        }
        if (conta.email === email) {
            return res.status(400).json({ mensagem: "O email informado já existe cadastrado!" })
        }

    }
    
    contaEncontrada.nome = nome
    contaEncontrada.cpf = cpf
    contaEncontrada.data_nascimento = data_nascimento
    contaEncontrada.telefone = telefone
    contaEncontrada.email = email
    contaEncontrada.senha = senha

    return res.json({ mensagem: "A conta foi atualizada" })
}


module.exports = atualizarConta