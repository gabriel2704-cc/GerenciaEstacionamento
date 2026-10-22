# Gerenciamento de Estacionamento

Controle de **vagas**, **veículos** e **permanências** (entrada e saída).

## Links

- Código: https://github.com/gabriel2704-cc/GerenciaEstacionamento.git
- API (Render): https://estacionamento-api-f1zu.onrender.com/
- Frontend (Vercel): https://gerencia-estacionamento.vercel.app/

## Antes de começar

- `estacionamento-backend/schema.sql`: cria as tabelas `vagas`, `veiculos` e `permanencias` (esta liga as outras duas por chave estrangeira).
- `estacionamento-backend/config.js`: configuração do Knex/Objection, com o banco local e o de produção.
- `estacionamento-frontend/.env`: endereço da API (variável `REACT_APP_ENDERECO_API`). Veja o `.env.example`.

## Rodando na minha máquina

1. Crie o banco `estacionamento` no PostgreSQL e execute o `schema.sql` nele.
2. Backend (porta 3001):
   ```bash
   cd estacionamento-backend
   npm install
   npm start
   ```
3. Frontend: crie o arquivo `estacionamento-frontend/.env` com
   `REACT_APP_ENDERECO_API=http://localhost:3001` e rode:
   ```bash
   cd estacionamento-frontend
   npm install
   npm start
   ```

## Roteiro de teste no Postman

1. Crie uma **Collection** e um **Environment** com a variável `url`:
   - produção: `https://estacionamento-api-f1zu.onrender.com`
   - local: `http://localhost:3001`
2. Execute nesta ordem (corpo em JSON, sem autenticação):

| # | Requisição | O que mostra |
|---|------------|--------------|
| 1 | `POST {{url}}/vagas` | insert em vagas |
| 2 | `POST {{url}}/veiculos` | insert em veículos |
| 3 | `POST {{url}}/permanencias` | insert usando as duas chaves estrangeiras |
| 4 | `GET {{url}}/permanencias` | leitura com JOIN |
| 5 | `PUT {{url}}/permanencias` | update: registra a saída (o `id` vai no corpo) |
| 6 | `DELETE {{url}}/permanencias/:id` | delete |

Exemplos de corpo:

```json
POST /vagas          { "numero": "A01", "tipo": "carro", "status": "ativa" }
POST /veiculos       { "placa": "ABC1D23", "modelo": "Gol", "cor": "Prata" }
POST /permanencias   { "vaga_id": 1, "veiculo_id": 1, "entrada": "2026-10-21T08:00" }
PUT  /permanencias   { "id": 1, "vaga_id": 1, "veiculo_id": 1, "entrada": "2026-10-21T08:00", "saida": "2026-10-21T10:00" }
```

Os testes em produção gravam no banco publicado. Ao final, apague o que criou (a permanência, depois o veículo e a vaga).

## Regras testadas pelo frontend

Placa duplicada, vaga ocupada ou inativa, saída antes da entrada e exclusão de vaga ou veículo com histórico aparecem como mensagem na interface.