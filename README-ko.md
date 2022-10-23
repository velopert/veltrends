# veltrends

벨트렌즈는 최근 기술 관련 소식을 한 눈에 볼 수 있게 해주는 웹사이트입니다.

[URL](https://www.veltrends.com)

![](https://www.veltrends.com/og-image.png)

## 기술 스택

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

## 로컬 환경에서 실행하기

### Backend

1. packages/veltrends-server 디렉터리에서 .env.sample을 .env 로 이름을 변경하세요.
2. packages/veltrends-server/prisma/schema.client 에서 `datasource db` 부분에서 다음과 같이 SQLite를 사용하도록 수정하세요.

```
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

> SQLite 대신 PostgreSQL을 쓰려면 이 [링크](packages/veltrends-server/dockers/postgresql/README.md)를 참고하여 PostgreSQL 서버를 실행하고 .env파일의 `DATABASE_URL`을 설정하고 schema.prisma에서 다음과 같이 `datasource db` 부분을 수정하세요. (원본 값)
>
> ```
> datasource db {
>   provider = "postgresql"
>   url      = env("DATABASE_URL")
> }
> ```

3. packages/veltrends-server/prisma/migrations 디렉터리를 지우세요.
4. `yarn install` 명령어를 사용하여 node_modules 를 설치하세요.
5. `yarn prisma migrate dev` 명령어를 사용하여 데이터베이스 초기설정을 하세요.
6. `yarn prisma generate` 명령어를 사용하여 Prisma Client를 생성하세요.
7. `yarn dev` 명령어를 사용하여 서버를 실행하세요. 서버는 8080 포트로 실행됩니다. http://localhost:8080/ 에 들어가서 서버가 잘 실행되고 있는지 확인하세요.

API 문서는 http://localhost:8080/documentation 에서 확인할 수 있습니다.

### Frontend

프런트엔드 프로젝트는 [pnpm](https://pnpm.io/)을 사용하여 node_modules를 설치합니다.

1. packages/veltrends-client 디렉터리에서 .env.sample 파일을 .env 로 이름을 변경하세요.
2. `pnpm install` 명령어를 사용하여 node_modules 를 설치하세요.
3. `pnpm dev` 명령어를 사용하여 서버를 실행하세요. 서버는 8788 포트로 실행됩니다. http://localhost:3000/ 에 들어가서 서버가 잘 실행되고 있는지 확인하세요.

## 문의

- 버그 신고는 [GitHub Issues](https://github.com/velopert/veltrends/issues)에 남겨주세요.
- 기능 제안 및 질문은 [GitHub Discussions](https://github.com/velopert/veltrends/discussions)에 남겨주세요.
- 기여는 언제든지 환영합니다.
