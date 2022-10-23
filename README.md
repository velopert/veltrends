# veltrends

[English](/README.md) | [한국어](/README-ko.md)

Veltrends is a website where users can explore trending tech news.

[URL](https://www.veltrends.com)

![](https://www.veltrends.com/og-image.png)

## Tech Stack

### Frontend

- React
- TypeScript
- Remix
- Styled Components
- Tanstack Query
- Sangte

### Backend

- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Swagger
- Typebox
- Algolia

### Infrastructure

- Terraform
- AWS

## Running on local environment

### Backend

1. Rename .env.sample to .env in packages/veltrends-server directory.
2. Modify `datasource db` part in packages/veltrends-server/prisma/schema.client to use SQLite as below

```
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

> If you want to use PostgreSQL instead of SQLite, run PostgreSQL server with [this link](packages/veltrends-server/dockers/postgresql/README.md), set `DATABASE_URL` in .env file, and modify `datasource db` part in schema.prisma as below.
>
> ```
> datasource db {
>   provider = "postgresql"
>   url      = env("DATABASE_URL")
> }
> ```

3. Delete packages/veltrends-server/prisma/migrations directory.
4. Use `yarn install` command to install node_modules.
5. Use `yarn prisma migrate dev` command to initialize database.
6. Use `yarn prisma generate` command to generate Prisma Client.
7. Use `yarn dev` command to run server. Server will run on port 8080. Go to http://localhost:8080/ to check if server is running .

API Documentation is available at http://localhost:8080/documentation.

### Frontend

Frontend project uses [pnpm](https://pnpm.io/) to install node_modules.

1. Rename .env.sample to .env in packages/veltrends-client directory.
2. Use `pnpm install` command to install node_modules.
3. Use `pnpm dev` command to run server. Server will run on port 8788. Go to http://localhost:3000/ to check if server is running.

## Bug Report, Feature Request, Questions

- Please report bugs on [GitHub Issues](https://github.com/velopert/veltrends/issues)
- Please ask questions and suggest features on [GitHub Discussions](https://github.com/velopert/veltrends/discussions)
- Contributions are always welcomed.
