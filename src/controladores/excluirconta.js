const { contas } = require('../bancodedados');

const exlcuirConta = (req, res) => {
    const numeroDaConta = Number(req.params.numeroConta);

    if (isNaN(numeroDaConta)) {
        return res.status(400).json({ mensagem: 'O número da conta não é válido' });
    }

    const contaEncontrada = contas.find(item => item.conta === numeroDaConta);
  
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "O número da conta não existe" });
    }

    if (contaEncontrada.saldo !== 0) {
        return res.status(400).json({ mensagem: "O saldo da conta ter que estar zerado" })
    }

    const indiceContaEncontrada = contas.findIndex(item => item.conta === contaEncontrada.conta); // ???? //

    contas.splice(indiceContaEncontrada, 1);

    return res.json({ mensagem: "Conta excluida" })

};

module.exports = exlcuirConta