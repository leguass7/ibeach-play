## Desenvolvimento com Next.js

1. clone o repositório
2. `git flow init -d`
3. na branch develop, instale as dependências com `npm install`
4. crie uma branch de feature com `git flow feature start nome-da-feature`
5. inicie o banco de dados no docker: `docker compose up -d --build`
6. alimente o banco de dados com `npm run db:init`
7. inicie em modo de desenvolvimento com `npm run dev`

## Scripts

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Rotas API

Documentação para uso de decorators na API:
[next-api-decorators](https://next-api-decorators.vercel.app/docs/)
