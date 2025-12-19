# API REST de Chat

## Descrição
API para registro, autenticação, listagem de usuários e troca de mensagens entre usuários. Ideal para praticar testes automatizados de API.

## Instalação
```bash
npm install
```

## Rodando a aplicação
```bash
npm run start
```
Ou para desenvolvimento com hot reload:
```bash
npx nodemon server.js
```

## Executando os testes
```bash
npm test
```

## Documentação Swagger
Acesse [http://localhost:3001/docs](http://localhost:3001/docs) após iniciar o servidor.

## Funcionalidades
- Cadastro e login de usuários
- Autenticação JWT
- Listagem de usuários
- Envio e listagem de mensagens

## Estrutura de Pastas
- `controllers/` - Lógica das rotas
- `routes/` - Definição das rotas
- `services/` - Regras de negócio
- `models/` - Modelos de dados
- `middlewares/` - Middlewares de autenticação

## CI
Os testes são executados automaticamente via GitHub Actions a cada push ou pull request.
# APIChatTestePerformance
