const { Router } = require('express');

const { getVeiculos, addVeiculo, updateVeiculo, deleteVeiculo, getVeiculoPorId } = require('../controllers/veiculoController');

const rotasVeiculos = new Router();

rotasVeiculos.route('/veiculos')
    .get(getVeiculos)
    .post(addVeiculo)
    .put(updateVeiculo);

rotasVeiculos.route('/veiculos/:id')
    .get(getVeiculoPorId)
    .delete(deleteVeiculo);

module.exports = { rotasVeiculos };
