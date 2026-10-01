const { Router } = require('express');

const { getPermanencias, addPermanencia, updatePermanencia, deletePermanencia, getPermanenciaPorId } = require('../controllers/permanenciaController');

const rotasPermanencias = new Router();

rotasPermanencias.route('/permanencias')
    .get(getPermanencias)
    .post(addPermanencia)
    .put(updatePermanencia);

rotasPermanencias.route('/permanencias/:id')
    .get(getPermanenciaPorId)
    .delete(deletePermanencia);

module.exports = { rotasPermanencias };
