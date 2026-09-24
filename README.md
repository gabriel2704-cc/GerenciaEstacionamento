# GerenciaEstacionamento

Este projeto é um sistema de gerenciamento de estacionamento com backend em Node.js/Express + PostgreSQL e frontend em React/PWA. A ideia principal é permitir controlar vagas, veículos e permanências de forma simples, com a API sendo a parte mais importante para os testes e o frontend funcionando como interface para o usuário.

## Estrutura do projeto

- `estacionamento-backend/`: API REST responsável por regras de negócio, banco de dados e comunicação com o PostgreSQL.
- `estacionamento-frontend/`: aplicação React que consome a API e exibe a interface do sistema.


## Tecnologias

- Backend: Node.js, Express, PostgreSQL, Objection.js (Knex)
- Frontend: React, react-bootstrap, PWA

## Como rodar localmente

### 1) Backend

1. Verifique se o PostgreSQL está instalado e rodando.
2. Crie o banco `estacionamento` com usuário `postgres` e senha `postgres`.
3. No terminal, execute:

```bash
cd estacionamento-backend
npm install
psql -U postgres -d estacionamento -f schema.sql
npm start
```

4. A API deve abrir em:

```text
http://localhost:3001
```

### 2) Frontend

1. Em outro terminal:

```bash
cd estacionamento-frontend
npm install
npm start
```

2. A interface deve abrir em:

```text
http://localhost:3000
```

3. O frontend já aponta para a API local no arquivo `.env`/configuração do projeto, então ele deve conseguir se comunicar com o backend em `http://localhost:3001`.

## Roteiro de teste completo 

Aqui vale a ideia de testar o sistema como se o usuário estivesse usando de verdade. 

### Teste do backend (Postman/Insomnia/HTTP)

1. Testar a API principal
   - Fazer `GET /vagas`
   - Confirmar que a rota responde com status correto
   - Verificar se a resposta vem em JSON e com os dados esperados

2. Testar cadastro de vaga
   - Enviar `POST /vagas` com uma vaga válida
   - Confirmar que a vaga foi criada
   - Verificar se a lista agora mostra essa vaga

3. Testar edição de vaga
   - Fazer `PUT /vagas` com um `id` válido
   - Confirmar que os dados foram alterados corretamente

4. Testar exclusão
   - Fazer `DELETE /vagas/:id`
   - Verificar que a vaga saiu da lista

5. Testar veículos
   - Cadastrar um veículo
   - Conferir se a placa foi salva em maiúsculas
   - Validar se o sistema aceita apenas o formato esperado

6. Testar permanências
   - Registrar entrada de veículo em uma vaga
   - Verificar se o sistema salva a hora de entrada corretamente
   - Registrar saída usando o fluxo de permanência
   - Verificar se o campo de saída é preenchido e se a relação com a vaga/placa fica correta

7. Testar erro e validação
   - Tentar enviar dados vazios ou inválidos
   - Verificar se o backend retorna mensagem clara e status adequado
   - Confirmar que não quebra em caso de erro de negócio

8. Teste final de API
   - Revisar se todas as rotas principais estão funcionando
   - Confirmar que a API responde sem travar
   - Verificar logs e respostas no terminal

### Teste do frontend

1. Abrir a aplicação em `http://localhost:3000`
2. Confirmar que a tela carrega sem erro visual
3. Testar cadastro de vaga e veículo pela interface
4. Confirmar que a página atualiza com os dados enviados
5. Validar se as ações de alteração e exclusão refletem no sistema
6. Testar o fluxo real do usuário: cadastrar, listar, editar e remover
7. Verificar se o frontend está consumindo corretamente a API e se não há erro de CORS ou URL
8. Se possível, testar o comportamento em modo PWA via build de produção

### O que é considerado teste completo

Para esse projeto, um teste completo significa:

- backend respondendo corretamente via requisições;
- frontend abrindo sem quebrar;
- fluxo principal funcionando do começo ao fim;
- validações de erro funcionando;
- dados sendo salvos e exibidos corretamente;
- aplicação funcionando em ambiente local com o banco e a API integrados.

Em outras palavras: a API funciona no Postman/Insomnia e a interface funciona no navegador com a mesma lógica do sistema. Se isso estiver ok, o projeto está pronto para publicar.

## Publicando no GitHub

1. Crie um repositório novo no GitHub.
2. No terminal, dentro da pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Primeiro commit"
git branch -M main
git remote add origin <URL_DO_REPOSITORIO>
git push -u origin main
```

3. Confirme que os arquivos subiram corretamente.
4. Opcional: habilite proteção de branch, issues e README para organizar o projeto.

## Deploy do backend no Render

O backend precisa de um banco PostgreSQL e de um serviço web para rodar a API.

### Passos

1. Acesse o Render.
2. Crie um banco PostgreSQL.
3. Crie um Web Service e conecte o repositório do projeto.
4. Defina o diretório do backend se necessário (no caso do monorepo, escolha a pasta `estacionamento-backend`).
5. Configure as variáveis de ambiente:

```text
NODE_ENV=production
DATABASE_URL=<URL_DO_BANCO_POSTGRES>
```

6. No build command, use:

```bash
npm install
```

7. No start command, use:

```bash
npm start
```

8. Aplique o schema do banco no PostgreSQL do Render:

```bash
psql <URL_DO_BANCO> -f schema.sql
```

9. Após isso, teste a API pública:

```text
https://SEU-SERVICO.onrender.com/vagas
```

10. Se a rota responder corretamente, o backend está publicado.

## Deploy do frontend na Vercel

O frontend é uma aplicação React e pode ser publicado facilmente na Vercel.

### Passos

1. Acesse o Vercel.
2. Importe o repositório do frontend.
3. Se for monorepo, selecione a pasta `estacionamento-frontend`.
4. Configure o framework como `Create React App`.
5. Defina as variáveis de ambiente:

```text
REACT_APP_ENDERECO_API=https://SEU-BACKEND.onrender.com
CI=false
```

6. Build command:

```bash
npm run build
```

7. Output directory:

```text
build
```

8. Faça o deploy.
9. Abra a URL gerada pela Vercel e teste o frontend em produção.
10. Verifique se ele consegue consumir a API publicada sem erro.

## Checklist final de deploy

Antes de considerar o projeto finalizado, confirme:

- [ ] GitHub com repositório atualizado
- [ ] Backend funcionando no Render
- [ ] Banco PostgreSQL conectado corretamente
- [ ] Frontend funcionando na Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] API e frontend se comunicando corretamente
- [ ] Fluxo principal do sistema testado
- [ ] README atualizado e claro para qualquer pessoa abrir o projeto

## Observações finais

A ideia aqui é simples: a parte mais importante do projeto é a lógica de negócio e a integração API + banco. Então, o teste principal é no backend via Postman/Insomnia, e a validação visual é no frontend rodando em navegador. Depois disso, o deploy no Render e na Vercel é apenas a etapa de publicar uma versão funcionando no mundo real.

Se quiser, posso também transformar esse README em uma versão mais visual, com badges, emojis e um modelo profissional de apresentação para entregar ao professor.
