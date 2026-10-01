const knex = require('knex');
const { Model } = require('objection');
const pg = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

// O PostgreSQL devolve TIMESTAMP como Date (com fuso). Aqui pedimos o valor como texto,
// assim o horário não fica deslocado.
pg.types.setTypeParser(1114, (valor) => valor.replace(' ', 'T'));

let conexao = null;
if (isProduction) {
    conexao = {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    };
} else {
    conexao = {
        user: 'postgres',
        host: 'localhost',
        database: 'estacionamento',
        password: 'postgres',
        port: 5432
    };
}

// Knex monta o SQL; o Objection usa o Knex para ligar as entities ao banco
const db = knex({ client: 'pg', connection: conexao });
Model.knex(db);

module.exports = { db };
