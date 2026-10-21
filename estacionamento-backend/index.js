const express = require('express');
const cors = require('cors');
require('./config');
const rotas = require('./routes/rotas');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Rota principal da API
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'sucesso',
        mensagem: 'API do Gerenciamento de Estacionamento funcionando!',
        rotas: {
            vagas: '/vagas',
            veiculos: '/veiculos',
            permanencias: '/permanencias'
        }
    });
});

// Rotas do sistema
app.use(rotas);

// Inicialização do servidor
app.listen(process.env.PORT || 3001, () => {
    console.log('API do Gerenciamento de Estacionamento rodando...');
});
