const { Model } = require('objection');

// Cada entity é um Model do Objection ligado a uma tabela do banco
class Vaga extends Model {
    static get tableName() {
        return 'vagas';
    }
}

module.exports = Vaga;
