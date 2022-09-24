## 1. Run PostgreSQL Server with docker compose

```bash
docker-compose up -d
```

## 2. Run Bash

```bash
docker exec -it postgres bash
```

## 3. login as postgres

```bash
su - postgres
```

## 4. Run following statements

```sql
CREATE DATABASE veltrends ENCODING 'UTF8';
CREATE USER veltrends WITH ENCRYPTED PASSWORD 'veltrends';
GRANT ALL PRIVILEGES ON DATABASE veltrends to veltrends;
ALTER USER veltrends CREATEDB;
```
