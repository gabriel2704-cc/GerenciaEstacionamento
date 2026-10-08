# Gerenciamento de Estacionamento — Frontend

Interface React (Create React App, modelo PWA) com react-bootstrap para cadastro de vagas, veículos e permanências. O Service Worker guarda em cache os arquivos da interface (que abre sem internet); os dados continuam dependendo da API.

> Link do frontend publicado: _(preencher após o deploy)_

## Executar localmente

```powershell
npm install
# O arquivo .env já aponta para a API local: REACT_APP_ENDERECO_API=http://localhost:3001
npm start
```

A interface fica em `http://localhost:3000`.

## Testar o PWA (build de produção)

O Service Worker só é ativado no build de produção, não no `npm start`.

```powershell
npm run build
npm install -g serve
serve -s build
```

Abra `http://localhost:3000` e, no F12 → *Application*, confira o *Manifest*, os ícones e o *Service Worker*.

## Publicar na Vercel

1. Importe o repositório do frontend.
2. Use o preset *Create React App* (Build Command `npm run build`, Output Directory `build`).
3. Variáveis: `REACT_APP_ENDERECO_API` = endereço da API **sem `/api` e sem barra no final** (ex.: `https://SUA-API.onrender.com`) e `CI` = `false`.
