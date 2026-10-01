const { getVagasDB, addVagaDB, updateVagaDB, deleteVagaDB, getVagaPorIdDB } = require('../usecases/vagaUseCases');

const getVagas = async (request, response) => {
    await getVagasDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as vagas: ' + err
        }));
};

const addVaga = async (request, response) => {
    await addVagaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Vaga criada',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const updateVaga = async (request, response) => {
    await updateVagaDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Vaga alterada',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const deleteVaga = async (request, response) => {
    await deleteVagaDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: 'success', message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const getVagaPorId = async (request, response) => {
    await getVagaPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

module.exports = {
    getVagas, addVaga, updateVaga, deleteVaga, getVagaPorId
};
