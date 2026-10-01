const express = require('express');
const cors = require('cors');
require('./config');
const rotas = require('./routes/rotas');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(rotas);

app.listen(process.env.PORT || 3001, () => {
    console.log('API do Gerenciamento de Estacionamento rodando...');
});
