# API de Fórmula 1 — projeto do curso de Node.js da DIO

Projeto desenvolvido como desafio do curso de Node.js da DIO. Esta API REST consulta equipes e pilotos da Fórmula 1 e foi implementada em Node.js, TypeScript e Fastify.

## Funcionalidades

- Lista as equipes cadastradas e suas sedes.
- Lista os pilotos cadastrados e suas equipes.
- Busca um piloto pelo ID.
- Retorna erro HTTP 404 quando o ID não existe.
- Permite chamadas de outros endereços por meio do CORS.

## Tecnologias

- Node.js: ambiente de execução.
- TypeScript: linguagem usada para escrever a aplicação.
- Fastify: servidor HTTP e definição das rotas.
- `@fastify/cors`: configuração de acesso da API por aplicações web.
- `tsx`: execução do TypeScript durante o desenvolvimento.
- `tsup`: compilação do projeto para JavaScript.

## Requisitos

- Node.js 20 ou superior.
- npm.

## Como executar

No terminal, dentro da pasta do projeto:

```powershell
Copy-Item .env.example .env
npm install
npm run start:dev
```

A API inicia na porta definida por `PORT` no arquivo `.env`. O valor padrão é `3333`. Mantenha o terminal aberto enquanto utiliza a API.

Para reiniciar o servidor automaticamente durante alterações:

```powershell
npm run start:watch
```

## Rotas

### Listar equipes

```http
GET /teams
```

Resposta: objeto com a propriedade `teams`, contendo o ID, nome e sede de cada equipe.

### Listar pilotos

```http
GET /drivers
```

Resposta: objeto com a propriedade `drivers`, contendo o ID, nome e equipe de cada piloto.

### Consultar piloto por ID

```http
GET /drivers/{id}
```

Exemplo:

```http
GET /drivers/1
```

Quando o piloto existe, a resposta contém o objeto `driver`. Quando não existe, a API responde com status `404` e a mensagem `Driver Not Found`.

## Estrutura do projeto

```text
.
├── src/
│   └── server.ts       # cria o Fastify, registra CORS e implementa as rotas
├── .env.example        # modelo da variável de ambiente PORT
├── .gitignore          # arquivos locais que não devem ir para o Git
├── package.json        # informações do projeto, dependências e scripts npm
├── package-lock.json   # versões exatas das dependências instaladas
└── tsconfig.json       # opções usadas pelo compilador TypeScript
```

### O que cada parte faz

- `src/server.ts`: cria a instância Fastify, registra o CORS, mantém os dados de equipes e pilotos e implementa `/teams`, `/drivers` e `/drivers/:id`.
- `.env.example`: fornece um exemplo de configuração. Copie-o para `.env` e ajuste `PORT` se quiser usar outra porta.
- `.gitignore`: evita enviar ao repositório dependências instaladas, arquivos de ambiente e arquivos gerados.
- `package.json`: guarda o nome e a descrição do projeto, os pacotes usados e comandos como `npm run start:dev`.
- `package-lock.json`: registra as versões exatas instaladas para que as dependências possam ser reproduzidas.
- `tsconfig.json`: define como o TypeScript verifica e transforma o código.

## Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run start:dev` | Inicia a API com `tsx`, carregando as variáveis do `.env`. |
| `npm run start:watch` | Inicia a API e reinicia ao detectar alterações nos arquivos. |
| `npm run dist` | Compila o código TypeScript para JavaScript na pasta `dist/`. |
| `npm run start:dist` | Compila o projeto e inicia a versão JavaScript gerada. |

## Dados

As equipes e os pilotos estão cadastrados em arrays no arquivo `src/server.ts`. Para adicionar um item, inclua um objeto com os mesmos campos dos registros existentes. Os IDs dos pilotos devem ser únicos para que a busca por ID retorne um único resultado.

