const Veiculo = require('../entities/veiculo');
const Permanencia = require('../entities/permanencia');

// Confere os campos obrigatórios e se a placa ainda não foi cadastrada
const validarVeiculo = async (veiculo, id) => {
    if (!veiculo.placa || !veiculo.modelo || !veiculo.cor) {
        throw 'Informe a placa, o modelo e a cor do veículo';
    }
    const existe = await Veiculo.query().findOne({ placa: veiculo.placa }).whereNot('id', id || 0);
    if (existe) {
        throw `Já existe um veículo com a placa ${veiculo.placa}`;
    }
};

const getVeiculosDB = async () => {
    try {
        return await Veiculo.query().orderBy('placa');
    } catch (err) {
        throw 'Erro : ' + err;
    }
};

const addVeiculoDB = async (body) => {
    try {
        const veiculo = {
            placa: String(body.placa || '').replace(/\s+/g, '').toUpperCase(),
            modelo: (body.modelo || '').trim(),
            cor: (body.cor || '').trim()
        };
        await validarVeiculo(veiculo);
        return await Veiculo.query().insert(veiculo);
    } catch (err) {
        throw 'Erro ao inserir o veículo: ' + err;
    }
};

const updateVeiculoDB = async (body) => {
    try {
        const veiculo = {
            placa: String(body.placa || '').replace(/\s+/g, '').toUpperCase(),
            modelo: (body.modelo || '').trim(),
            cor: (body.cor || '').trim()
        };
        await validarVeiculo(veiculo, body.id);
        const alterado = await Veiculo.query().patchAndFetchById(body.id, veiculo);
        if (!alterado) {
            throw `Nenhum registro encontrado com o id ${body.id} para ser alterado`;
        }
        return alterado;
    } catch (err) {
        throw 'Erro ao alterar o veículo: ' + err;
    }
};

const deleteVeiculoDB = async (id) => {
    try {
        // Veículo com histórico de permanências não pode ser excluído
        const usado = await Permanencia.query().findOne({ veiculo_id: id });
        if (usado) {
            throw 'o veículo possui permanências registradas';
        }
        const apagados = await Veiculo.query().deleteById(id);
        if (apagados == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        }
        return 'Veículo removido com sucesso';
    } catch (err) {
        throw 'Erro ao remover o veículo: ' + err;
    }
};

const getVeiculoPorIdDB = async (id) => {
    try {
        const veiculo = await Veiculo.query().findById(id);
        if (!veiculo) {
            throw 'Nenhum registro encontrado com o id: ' + id;
        }
        return veiculo;
    } catch (err) {
        throw 'Erro ao recuperar o veículo: ' + err;
    }
};

module.exports = {
    getVeiculosDB, addVeiculoDB, updateVeiculoDB, deleteVeiculoDB, getVeiculoPorIdDB
};
