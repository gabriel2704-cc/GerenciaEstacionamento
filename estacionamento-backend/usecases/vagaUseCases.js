const Vaga = require('../entities/vaga');
const Permanencia = require('../entities/permanencia');

const tipos = ['carro', 'moto', 'acessivel'];
const situacoes = ['ativa', 'inativa'];

// Confere os campos obrigatórios e se o número da vaga ainda não existe
const validarVaga = async (vaga, id) => {
    if (!vaga.numero || !tipos.includes(vaga.tipo) || !situacoes.includes(vaga.status)) {
        throw 'Informe o número, o tipo e o status da vaga';
    }
    const existe = await Vaga.query().findOne({ numero: vaga.numero }).whereNot('id', id || 0);
    if (existe) {
        throw `Já existe uma vaga com o número ${vaga.numero}`;
    }
};

const getVagasDB = async () => {
    try {
        return await Vaga.query().orderBy('numero');
    } catch (err) {
        throw 'Erro : ' + err;
    }
};

const addVagaDB = async (body) => {
    try {
        const vaga = { numero: (body.numero || '').trim(), tipo: body.tipo, status: body.status };
        await validarVaga(vaga);
        return await Vaga.query().insert(vaga);
    } catch (err) {
        throw 'Erro ao inserir a vaga: ' + err;
    }
};

const updateVagaDB = async (body) => {
    try {
        const vaga = { numero: (body.numero || '').trim(), tipo: body.tipo, status: body.status };
        await validarVaga(vaga, body.id);
        const alterada = await Vaga.query().patchAndFetchById(body.id, vaga);
        if (!alterada) {
            throw `Nenhum registro encontrado com o id ${body.id} para ser alterado`;
        }
        return alterada;
    } catch (err) {
        throw 'Erro ao alterar a vaga: ' + err;
    }
};

const deleteVagaDB = async (id) => {
    try {
        // Vaga com histórico de permanências não pode ser excluída
        const usada = await Permanencia.query().findOne({ vaga_id: id });
        if (usada) {
            throw 'a vaga possui permanências registradas';
        }
        const apagadas = await Vaga.query().deleteById(id);
        if (apagadas == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        }
        return 'Vaga removida com sucesso';
    } catch (err) {
        throw 'Erro ao remover a vaga: ' + err;
    }
};

const getVagaPorIdDB = async (id) => {
    try {
        const vaga = await Vaga.query().findById(id);
        if (!vaga) {
            throw 'Nenhum registro encontrado com o id: ' + id;
        }
        return vaga;
    } catch (err) {
        throw 'Erro ao recuperar a vaga: ' + err;
    }
};

module.exports = {
    getVagasDB, addVagaDB, updateVagaDB, deleteVagaDB, getVagaPorIdDB
};
