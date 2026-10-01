const { getPermanenciasDB, addPermanenciaDB, updatePermanenciaDB, deletePermanenciaDB, getPermanenciaPorIdDB } = require('../usecases/permanenciaUseCases');

const getPermanencias = async (request, response) => {
    await getPermanenciasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as permanências: ' + err
        }));
};

const addPermanencia = async (request, response) => {
    await addPermanenciaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Permanência criada',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const updatePermanencia = async (request, response) => {
    await updatePermanenciaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Permanência alterada',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const deletePermanencia = async (request, response) => {
    await deletePermanenciaDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: 'success', message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const getPermanenciaPorId = async (request, response) => {
    await getPermanenciaPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

module.exports = {
    getPermanencias, addPermanencia, updatePermanencia, deletePermanencia, getPermanenciaPorId
};
