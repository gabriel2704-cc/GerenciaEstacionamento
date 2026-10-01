const { getVeiculosDB, addVeiculoDB, updateVeiculoDB, deleteVeiculoDB, getVeiculoPorIdDB } = require('../usecases/veiculoUseCases');

const getVeiculos = async (request, response) => {
    await getVeiculosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os veículos: ' + err
        }));
};

const addVeiculo = async (request, response) => {
    await addVeiculoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Veículo criado',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const updateVeiculo = async (request, response) => {
    await updateVeiculoDB(request.body)
        .then(data => response.status(200).json({
            status: 'success', message: 'Veículo alterado',
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const deleteVeiculo = async (request, response) => {
    await deleteVeiculoDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: 'success', message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

const getVeiculoPorId = async (request, response) => {
    await getVeiculoPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
};

module.exports = {
    getVeiculos, addVeiculo, updateVeiculo, deleteVeiculo, getVeiculoPorId
};
