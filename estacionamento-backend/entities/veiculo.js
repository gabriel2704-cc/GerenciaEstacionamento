const { Model } = require('objection');

class Veiculo extends Model {
    static get tableName() {
        return 'veiculos';
    }
}

module.exports = Veiculo;
