# Gerenciamento de Estacionamento

Controlole de **vagas**, **veículos** e **permanências** (entrada e saída).

## Links

- Código: https://github.com/gabriel2704-cc/GerenciaEstacionamento.git
- API (Render): https://estacionamento-api-f1zu.onrender.com/
- Frontend (Vercel): https://gerencia-estacionamento.vercel.app/

## Antes de começar

- `schema.sql`: cria as tabelas `vagas`, `veiculos` e `permanencias` (esta liga as outras duas por chave estrangeira).
- `config.js` (backend): configuração do Knex/Objection, com o banco local e o de produção.
- `.env` (frontend): endereço da API. Por padrão aponta para a rota local.

## Rodando na minha máquina

1. Crie o banco e execute o `schema.sql` nele.
2. Backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
3. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Roteiro de teste no Postman

1. Crie uma **Collection** e um **Environment** com a variável `url`:
   - produção: `https://estacionamento-api-f1zu.onrender.com`
   - local: troque só o valor de `url`.
2. Execute nesta ordem:

| # | Requisição | O que mostra |
|---|------------|--------------|
| 1 | `POST {{url}}/vagas` | insert em vagas |
| 2 | `POST {{url}}/veiculos` | insert em veículos |
| 3 | `POST {{url}}/permanencias` | insert usando as duas chaves estrangeiras |
| 4 | `GET {{url}}/permanencias` | leitura com JOIN |
| 5 | `PUT {{url}}/permanencias` | update: registra a saída |
| 6 | `DELETE {{url}}/permanencias/:id` | delete (apaga o que o teste criou) |

Os testes em produção gravam no banco publicado, por isso o último passo remove o registro criado.

## Regras testadas pelo frontend

Duplicidade de placa, vaga já ocupada, saída antes da entrada e exclusão de registro com histórico aparecem como mensagem na interface.