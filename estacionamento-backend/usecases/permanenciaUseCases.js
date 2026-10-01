const Permanencia = require('../entities/permanencia');
const Vaga = require('../entities/vaga');
const Veiculo = require('../entities/veiculo');

// Confere as regras da permanência (id = permanência que está sendo editada, se houver)
const validarPermanencia = async (p, id) => {
    if (!p.vaga_id || !p.veiculo_id || !p.entrada) {
        throw 'Informe a vaga, o veículo e a data de entrada';
    }
    if (p.saida && new Date(p.saida) <= new Date(p.entrada)) {
        throw 'A saída deve ser posterior à entrada';
    }

    const vaga = await Vaga.query().findById(p.vaga_id);
    if (!vaga) {
        throw 'Vaga não encontrada';
    }
    const veiculo = await Veiculo.query().findById(p.veiculo_id);
    if (!veiculo) {
        throw 'Veículo não encontrado';
    }

    // Sem horário de saída o veículo ainda está estacionado: aí valem as regras de ocupação
    if (!p.saida) {
        if (vaga.status === 'inativa') {
            throw 'A vaga está inativa';
        }
        const vagaOcupada = await Permanencia.query()
            .where('vaga_id', p.vaga_id).whereNull('saida').whereNot('id', id || 0).first();
        if (vagaOcupada) {
            throw 'A vaga já está ocupada';
        }
        const veiculoEstacionado = await Permanencia.query()
            .where('veiculo_id', p.veiculo_id).whereNull('saida').whereNot('id', id || 0).first();
        if (veiculoEstacionado) {
            throw 'O veículo já está estacionado em outra vaga';
        }
    }
};

const getPermanenciasDB = async () => {
    try {
        // joinRelated usa as relações da entity para fazer o JOIN com vagas e veículos
        return await Permanencia.query()
            .joinRelated('[vaga, veiculo]')
            .select('permanencias.*', 'vaga.numero as vaga', 'veiculo.placa as placa')
            .orderBy('permanencias.entrada', 'desc');
    } catch (err) {
        throw 'Erro : ' + err;
    }
};

const addPermanenciaDB = async (body) => {
    try {
        const p = {
            vaga_id: body.vaga_id,
            veiculo_id: body.veiculo_id,
            entrada: body.entrada,
            saida: body.saida || null
        };
        await validarPermanencia(p);
        return await Permanencia.query().insert(p);
    } catch (err) {
        throw 'Erro ao registrar a permanência: ' + err;
    }
};

const updatePermanenciaDB = async (body) => {
    try {
        const p = {
            vaga_id: body.vaga_id,
            veiculo_id: body.veiculo_id,
            entrada: body.entrada,
            saida: body.saida || null
        };
        await validarPermanencia(p, body.id);
        const alterada = await Permanencia.query().patchAndFetchById(body.id, p);
        if (!alterada) {
            throw `Nenhum registro encontrado com o id ${body.id} para ser alterado`;
        }
        return alterada;
    } catch (err) {
        throw 'Erro ao alterar a permanência: ' + err;
    }
};

const deletePermanenciaDB = async (id) => {
    try {
        const apagadas = await Permanencia.query().deleteById(id);
        if (apagadas == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        }
        return 'Permanência removida com sucesso';
    } catch (err) {
        throw 'Erro ao remover a permanência: ' + err;
    }
};

const getPermanenciaPorIdDB = async (id) => {
    try {
        const p = await Permanencia.query()
            .joinRelated('[vaga, veiculo]')
            .select('permanencias.*', 'vaga.numero as vaga', 'veiculo.placa as placa')
            .findById(id);
        if (!p) {
            throw 'Nenhum registro encontrado com o id: ' + id;
        }
        return p;
    } catch (err) {
        throw 'Erro ao recuperar a permanência: ' + err;
    }
};

module.exports = {
    getPermanenciasDB, addPermanenciaDB, updatePermanenciaDB, deletePermanenciaDB, getPermanenciaPorIdDB
};
