# API de Fórmula 1 — projeto do curso de Node.js da DIO

Projeto desenvolvido como desafio do curso de Node.js da DIO. Esta API REST apresenta as equipes e os pilotos da temporada 2026 da Fórmula 1 e oferece consulta individual e filtro de pilotos por equipe.

## Funcionalidades

- Lista as 11 equipes e suas sedes.
- Lista os 22 pilotos da temporada 2026.
- Filtra pilotos pelo nome da equipe, sem diferenciar maiúsculas de minúsculas.
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

### Listar todos os pilotos

```http
GET /drivers
```

Resposta: objeto com a propriedade `drivers`, contendo o ID, nome e equipe de cada piloto.

### Filtrar pilotos por equipe

```http
GET /drivers?team=McLaren
```

O filtro ignora diferenças entre letras maiúsculas e minúsculas, então `?team=mclaren` também funciona. Se não houver uma equipe correspondente, a API retorna `200` com `drivers` como lista vazia.

### Consultar piloto por ID

```http
GET /drivers/1
```

Quando o piloto existe, a resposta contém o objeto `driver`. Quando não existe, a API responde com status `404` e a mensagem `Driver Not Found`.

## Estrutura do projeto

```text
.
├── src/
│   └── server.ts       # dados das equipes/pilotos e rotas HTTP
├── .env.example        # modelo da variável de ambiente PORT
├── .gitignore          # arquivos locais que não devem ir para o Git
├── package.json        # informações do projeto, dependências e scripts npm
├── package-lock.json   # versões exatas das dependências instaladas
└── tsconfig.json       # opções usadas pelo compilador TypeScript
```

### O que cada parte faz

- `src/server.ts`: cria a instância Fastify, registra o CORS, mantém os dados da temporada e implementa `/teams`, `/drivers`, `/drivers?team=...` e `/drivers/:id`.
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

## Dados e fontes

As equipes e pilotos são mantidos em arrays no arquivo `src/server.ts`. Os IDs são únicos e servem para a rota de consulta individual. Para atualizar a formação da temporada, edite essas listas.

A formação de 2026 foi baseada na [lista oficial de pilotos da Fórmula 1](https://www.formula1.com/en/drivers) e na [lista de inscritos da FIA para o GP de São Paulo de 2026](https://www.fia.com/system/files/decision-document/2026_sao_paulo_grand_prix_-_entry_list.pdf).
