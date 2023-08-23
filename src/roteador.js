const express = require('express');
const rotas = express();

const listarContas = require('./controladores/listarcontas');
const senha = require('./intermediarios');
const criarContas = require('./controladores/criarcontas');
const atualizarConta = require('./controladores/atualizarconta');
const exlcuirConta = require('./controladores/excluirconta');
const deposito = require('./controladores/depositar');
const sacar = require('./controladores/sacar');
const transferencia = require('./controladores/transferir');
const saldoDaConta = require('./controladores/saldo');
const extratoDaConta = require('./controladores/extrato');


rotas.get('/contas', senha, listarContas);
rotas.post('/contas', criarContas);
rotas.put('/contas/:numeroConta/usuario', atualizarConta);
rotas.delete('/contas/:numeroConta', exlcuirConta);
rotas.post('/transacoes', deposito);
rotas.post('/sacar', sacar);
rotas.post('/transferir', transferencia);
rotas.get('/contas/saldo', saldoDaConta)
rotas.get('/contas/extrato', extratoDaConta)

module.exports = rotas