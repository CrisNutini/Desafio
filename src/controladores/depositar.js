const { contas, depositos } = require('../bancodedados');


const deposito = (req, res) => {

    const { numero_conta, valor } = req.body

    if (!numero_conta) {
        return res.status(400).json({ mensagem: 'O numero da conta deve ser informado.' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor deve ser informado.' });
    }
    if (valor < 0 || valor === 0){
        return res.status(400).json({ mensagem: 'O valor deve ser maior que zero.' });
    }

    const contaEncontrada = contas.find(item => item.conta === numero_conta);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "O número da conta não existe" });
    }
    contaEncontrada.saldo += valor

    const registroDeposito = {
        data: new Date(),
        numero_conta,
        valor
    }
    depositos.push(registroDeposito);

    return res.status(201).json({ mensagem: "Deposito efetuado com sucesso" })

}

module.exports = deposito