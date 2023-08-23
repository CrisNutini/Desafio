const { contas, transferencias } = require('../bancodedados');

const transferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem) {
        return res.status(400).json({ mensagem: 'O numero da conta de origem deve ser informado.' });
    }
    if (!numero_conta_destino) {
        return res.status(400).json({ mensagem: 'O numero da conta de destino deve ser informado.' });
    }
    if (!valor) {
        return res.status(400).json({ mensagem: 'O valor deve ser informado.' });
    }
    if (!senha) {
        return res.status(400).json({ mensagem: 'A senha deve ser informada.' });
    }

    const contaOrigemEncontrada = contas.find(item => item.conta === numero_conta_origem);

    if (!contaOrigemEncontrada) {
        return res.status(404).json({ mensagem: "O número da conta de origem não existe" });
    }

    const contaDestinoEncontrada = contas.find(item => item.conta === numero_conta_destino);

    if (!contaDestinoEncontrada) {
        return res.status(404).json({ mensagem: "O número da conta de destino não existe" });
    }

    if (contaOrigemEncontrada.senha !== senha) {
        return res.status(401).json({ mensagem: "A senha informada não é válida" });
    }

    if (contaOrigemEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente para a transferencia" });
    }
    contaOrigemEncontrada.saldo -= valor
    contaDestinoEncontrada.saldo += valor

    const registroDeTransferncia = {
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }
    transferencias.push(registroDeTransferncia);

    return res.status(200).json({ mensagem: "Transferência efetuada com sucesso" })
}

module.exports = transferencia