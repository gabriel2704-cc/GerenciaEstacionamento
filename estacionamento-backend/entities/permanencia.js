const { Model } = require('objection');
const Vaga = require('./vaga');
const Veiculo = require('./veiculo');

class Permanencia extends Model {
    static get tableName() {
        return 'permanencias';
    }

    // Relações: cada permanência pertence a uma vaga e a um veículo (as duas chaves estrangeiras)
    static get relationMappings() {
        return {
            vaga: {
                relation: Model.BelongsToOneRelation,
                modelClass: Vaga,
                join: { from: 'permanencias.vaga_id', to: 'vagas.id' }
            },
            veiculo: {
                relation: Model.BelongsToOneRelation,
                modelClass: Veiculo,
                join: { from: 'permanencias.veiculo_id', to: 'veiculos.id' }
            }
        };
    }
}

module.exports = Permanencia;
