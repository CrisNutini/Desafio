const { contas, saques, depositos, transferencias } = require('../bancodedados');


const extratoDaConta = (req, res) => {
  const { numero_conta, senha } = req.query

  if (!numero_conta) {
    return res.status(400).json({ mensagem: 'O numero da conta deve ser informado.' });
  }
  if (!senha) {
    return res.status(400).json({ mensagem: 'A senha deve ser informada.' });
  }

  const contaEncontrada = contas.find(item => item.conta === Number(numero_conta));

  if (!contaEncontrada) {
    return res.status(404).json({ mensagem: "O número da conta não existe" });
  }

  if (contaEncontrada.senha !== Number(senha)) {
    return res.status(401).json({ mensagem: "A senha informada não é válida" });
  }

  const regitroDeSaque = saques.filter(item => item.numero_conta === Number(numero_conta));
  const regitroDeDeposito = depositos.filter(item => item.numero_conta === Number(numero_conta));
  const regitroDeTransferenciaOrigem = transferencias.filter(item => item.numero_conta_origem === Number(numero_conta));
  const regitroDeTransferenciaDestino = transferencias.filter(item => item.numero_conta_destino === Number(numero_conta));


  return res.status(200).json({ saques: regitroDeSaque, depositos: regitroDeDeposito, transferenciasEnviadas: regitroDeTransferenciaOrigem, transferenciasRecebidas: regitroDeTransferenciaDestino })
}

module.exports = extratoDaConta