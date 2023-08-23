const { contas, saques } = require('../bancodedados');

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta deve ser informado.' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor deve ser informado.' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha deve ser informada.' });
    }

    const contaEncontrada = contas.find(item => item.conta === numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "O número da conta não existe" });
    }

    if (contaEncontrada.senha !== senha) {
        return res.status(401).json({ mensagem: "A senha informada não é válida" });
    }
        
    if(contaEncontrada.saldo < valor){
        return res.status(400).json({ mensagem: "O saldo não é suficiente para saque" });
    }

    contaEncontrada.saldo -= valor

    const registroSaque = {
        data: new Date(),
        numero_conta,
        valor
    }
    saques.push(registroSaque);
    
    return res.status(201).json({ mensagem: "Saque efetuado com sucesso" })

}


module.exports = sacar