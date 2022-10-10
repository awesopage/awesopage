<div align="center">
  <img src="public/images/thumbnail.png" alt="Awesopage">
</div>

# Awesopage

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/awesopage/awesopage/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/awesopage/awesopage/tree/develop)
[![Test Coverage](https://api.codeclimate.com/v1/badges/07be7ed1e7b917920c4e/test_coverage)](https://codeclimate.com/github/awesopage/awesopage/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/07be7ed1e7b917920c4e/maintainability)](https://codeclimate.com/github/awesopage/awesopage/maintainability)

## Tech stack

- [Next.js](https://nextjs.org)
- [Chakra UI](https://chakra-ui.com)
- [Prisma](https://www.prisma.io) + [CockroachDB](https://github.com/cockroachdb/cockroach)
- [Zustand](https://github.com/pmndrs/zustand) + [Immer](https://immerjs.github.io/immer)

## Development

### Install dependencies

- Install Node.js v16 LTS
- Install pnpm v7 https://pnpm.io/installation
- Run `pnpm boot`

### Manage local services (Docker Compose)

- Local services are defined in `docker/docker-compose-local.yaml`.
- To start the services, run `node scripts/local-services start`.
- To stop the services, run `node scripts/local-services stop`.
- To reset the services (all volumes will be deleted), run `node scripts/local-services reset`.
- To tail logs of the services, run `node scripts/local-services logs`.
- CockroachDB Console is at http://localhost:4920.

### Manage database models (Prisma)

- Prisma schema is defined in `packages/pkg-app-model/schema/app.prisma`.
- To sync or create Prisma migrations, run `node scripts/model-schema migrate`.
- To generate Prisma client, run `node scripts/model-schema generate`.

### Start development

```
pnpm dev
```

### Run tests

- Run unit tests with `pnpm test`.
- Run unit tests in quick mode with `pnpm test-quick` (no TypeScript compilation, no code coverage, just default reporter).
- Test report is created in `test-report/index.html`.

### Compile code

```
pnpm compile
```

### Lint code

```
pnpm lint
```

### Clean workspace

```
pnpm clean
```

### Check outdated dependencies

```
pnpm outdated --recursive
```
