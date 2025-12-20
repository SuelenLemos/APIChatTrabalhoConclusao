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

Teste commit

## Testes de Performance com K6

Foram criados testes de performance utilizando K6, organizados na pasta `test/k6/`. Os testes implementam diversos conceitos de boas práticas de testes de performance, conforme detalhado abaixo.

### Thresholds
Aplicado no arquivo `test/k6/tests-performance.js` nas opções de configuração. Define que 95% das requisições HTTP devem ter duração inferior a 500ms (`http_req_duration: ['p(95)<500']`). Isso é baseado em boas práticas de performance para APIs, garantindo que a maioria dos usuários tenha uma experiência responsiva. Também inclui um threshold para taxa de falhas inferior a 10%.

### Checks
Utilizado em `test/k6/tests-performance.js` para validar o status HTTP e o conteúdo das respostas. Por exemplo, `check(response, { 'status is 200': (r) => r.status === 200 })` verifica se a resposta tem status 200. Isso assegura que as APIs estejam funcionando corretamente durante o teste de carga.

### Helpers
Implementado no arquivo `test/k6/helpers.js`, que contém funções auxiliares como `login()`, `generateUserData()` e `generateMessageData()`. Usa geração simples de dados aleatórios com `Math.random()` para simular dados fictícios, evitando dependências externas. Por exemplo, `generateUserData()` cria usernames e passwords aleatórios. Isso promove reutilização de código e clareza nos testes, mantendo simplicidade sem bibliotecas adicionais.

### Trends
Definido em `test/k6/tests-performance.js` com `let loginTrend = new Trend('login_duration');` e usado para medir a duração das operações de login (`loginTrend.add(endTime - startTime);`). Permite analisar tendências de performance ao longo do tempo.

### Faker
Originalmente integrado via `test/k6/helpers.js` importando `faker` de um CDN, mas removido devido a incompatibilidades com a versão do K6 instalada. Substituído por geração manual de dados aleatórios usando `Math.random()` para manter os testes funcionais. Por exemplo, `generateMessageData()` cria conteúdos com números aleatórios. Isso garante compatibilidade e simplicidade, simulando cenários reais sem dependências externas.

### Variável de Ambiente
Configurado em `test/k6/tests-performance.js` com `const baseUrl = __ENV.BASE_URL || 'http://localhost:3001';`. Permite executar os testes em diferentes ambientes (desenvolvimento, staging, produção) passando `--env BASE_URL=http://example.com` no comando K6.

### Stages
Definido nas opções de `test/k6/tests-performance.js`: ramp up para 10 usuários em 30s, steady state por 1min, e ramp down. Simula um cenário real de carga crescente, manutenção e diminuição, ajudando a identificar gargalos em diferentes fases.

### Reaproveitamento de Resposta
Aplicado em `test/k6/helpers.js` na função `login()`, onde o token é extraído da resposta (`return response.json().token;`) e reutilizado nos testes subsequentes. Também em `tests-performance.js`, o token é usado para requests autenticados. Isso otimiza os testes e simula fluxos reais de usuário.

### Uso de Token de Autenticação
Implementado em `test/k6/tests-performance.js` nos headers das requests: `'Authorization': \`Bearer ${token}\``. O token é obtido via login e usado para endpoints protegidos como envio e listagem de mensagens. Garante que os testes simulem usuários autenticados.

### Data-Driven Testing
Usado em `test/k6/tests-performance.js` com um array `testUsers` contendo diferentes usuários. Um usuário é selecionado aleatoriamente por iteração (`const user = testUsers[Math.floor(Math.random() * testUsers.length)];`). Permite testar com múltiplos cenários de dados sem duplicar código.

### Groups
Aplicado em `test/k6/tests-performance.js` para organizar os testes: `group('Authentication', ...)`, `group('User Operations', ...)`, `group('Message Operations', ...)`. Simplifica a leitura e manutenção, agrupando operações relacionadas.

### Relatório de Execução em HTML
Para gerar o relatório, execute:
```bash
k6 run --out json=results.json test/k6/tests-performance.js
```
Em seguida, use uma ferramenta como `k6-html-reporter` (instale com `npm install -g k6-html-reporter`) para converter:
```bash
k6-html-reporter -f results.json -o report.html
```
Isso cria um relatório HTML detalhado com métricas, gráficos e análises de performance.