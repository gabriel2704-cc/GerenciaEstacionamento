const { Router } = require('express');

const { rotasVagas } = require('./rotasVagas');
const { rotasVeiculos } = require('./rotasVeiculos');
const { rotasPermanencias } = require('./rotasPermanencias');

const rotas = new Router();

rotas.use(rotasVagas);
rotas.use(rotasVeiculos);
rotas.use(rotasPermanencias);

module.exports = rotas;
