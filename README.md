## Desenvolvimento com Next.js

1. clone o repositório
2. `git flow init -d`
3. na branch develop, instale as dependências com `npm install`
4. crie uma branch de feature com `git flow feature start nome-da-feature`
5. configure o arquivo `.env.local` com as [variáveis de ambiente](#variáveis-de-ambiente)
6. inicie o banco de dados no docker: `docker compose up -d --build`
7. alimente o banco de dados com `npm run db:init`
8. inicie em modo de desenvolvimento com `npm run dev`

## Scripts

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis de ambiente:

```env
NEXTAUTH_JWT_SECRET="06bc..."
NEXTAUTH_SECRET="769f..."

GOOGLE_CLIENT_ID="...googleusercontent.com"
GOOGLE_CLIENT_SECRET="GO..."

DATABASE_URL="postgres://default:my_db_password@localhost/mydbname"

POSTGRES_DATABASE="mydbname"
POSTGRES_HOST="localhost"
POSTGRES_USER="default"
POSTGRES_PASSWORD="my_db_password"

```

## Banco de dados Local

> Para rodar o banco de dados localmente, é necessário ter o docker instalado.

1. `docker compose up -d`
2. `npm run db:init`

Altere o arquivo `./prisma/schema.prisma`, para alternar o host de conexão com banco de dados.

#### Localhost

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
}
```

### Rotas API

Documentação para uso de decorators na API:
[next-api-decorators](https://next-api-decorators.vercel.app/docs/)
