# interview
A full stack developer homework assignment.

## Run development server:
1. This monorepo works with docker compose. so you need docker and docker-compose installd.
follow [these](https://docs.docker.com/engine/install) instruction to istall them

2. Install dependencies:
```sh
yarn
```

3. build development stack with doker:
```sh
yarn dev # bind -d flag at end for detached terminal: yarn dev -d
```

1. migrate database (REQUIRED ONLY ONCE AFTER FIRST RUN):
```sh
yarn db:init
```
the above command will make tables and will add seed data into tables

_4.1. (optional) check database using drizzle studio:_
```sh
yarn db:studio
```
