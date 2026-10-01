# Gerenciamento de Estacionamento — API

API REST do Gerenciamento de Estacionamento, feita com Node.js, Express, PostgreSQL e Objection.js (sobre o Knex).

> Link da API publicada: _(preencher após o deploy)_

## Requisitos

- Node.js 20 ou superior
- PostgreSQL local ou banco PostgreSQL hospedado

## Executar localmente

```powershell
npm install
# Crie o banco "estacionamento" (usuário postgres, senha postgres) e aplique o schema
psql -U postgres -d estacionamento -f schema.sql
npm start
```

A API fica em `http://localhost:3001`.

## Rotas

Para cada recurso (`vagas`, `veiculos`, `permanencias`):

| Rota | Descrição |
| --- | --- |
| `GET /vagas` | lista |
| `GET /vagas/:id` | busca pelo id |
| `POST /vagas` | cadastra |
| `PUT /vagas` | altera (o `id` vai **no corpo**) |
| `DELETE /vagas/:id` | remove |

As vagas aceitam os tipos `carro`, `moto` e `acessivel`, e status `ativa` ou `inativa`. Placas são salvas em maiúsculas sem espaços. A saída de uma permanência é registrada pelo `PUT` preenchendo o campo `saida`. A listagem de permanências traz `vaga` e `placa`.

As respostas usam `{ status, message }` (200 no sucesso, 400 no erro); as de criação e alteração trazem também `objeto`.

## Estrutura em camadas

- `index.js`: sobe o Express.
- `config.js`: conexão com o banco (Knex) e ligação dos Models do Objection.
- `routes/`: define as rotas.
- `controllers/`: recebe a requisição e devolve a resposta com `.then().catch()`.
- `usecases/`: regras de negócio e acesso ao banco (`Vaga.query()`, `joinRelated` etc.).
- `entities/`: um Model por tabela, com as relações da `Permanencia`.

As tabelas, chaves estrangeiras e índices continuam sendo criados pelo `schema.sql`.

## Publicar no Render

1. Crie um PostgreSQL e um Web Service no Render, na mesma região.
2. Execute o `schema.sql` no banco (não execute o schema automaticamente na inicialização).
3. Build Command `npm install`, Start Command `npm start`.
4. Variáveis: `DATABASE_URL` (External Database URL do banco) e `NODE_ENV=production`.
5. Teste `https://SUA-API.onrender.com/vagas`.
