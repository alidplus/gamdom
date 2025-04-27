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
yarn exec yarn workspace @repo/db migrate
yarn exec yarn workspace @repo/db seed
```
the above command will make tables and will add seed data into tables

[open dev server in your browser](http://127.0.0.1:8080/)
