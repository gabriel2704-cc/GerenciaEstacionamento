const { Router } = require('express');

const { getVagas, addVaga, updateVaga, deleteVaga, getVagaPorId } = require('../controllers/vagaController');

const rotasVagas = new Router();

rotasVagas.route('/vagas')
    .get(getVagas)
    .post(addVaga)
    .put(updateVaga);

rotasVagas.route('/vagas/:id')
    .get(getVagaPorId)
    .delete(deleteVaga);

module.exports = { rotasVagas };
