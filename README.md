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
- [Playwright](https://playwright.dev)

## Development

### Install dependencies

- Install Node.js v18 LTS
- Install pnpm v7 https://pnpm.io/installation
- Run `pnpm boot-full`

### Manage local services (Docker Compose)

- Local services are defined in `docker/docker-compose-local.yaml`.
- To start the services, run `pnpm local-services start`.
- To stop the services, run `pnpm local-services stop`.
- To reset the services (all volumes will be deleted), run `pnpm local-services reset`.
- To tail logs of the services, run `pnpm local-services logs`.
- CockroachDB Console will be at http://localhost:4920.

### Manage database models (Prisma)

- Prisma schema is defined in `packages/pkg-app-model/schema/app.prisma`.
- To sync or create Prisma migrations, run `pnpm model-schema migrate`.
- To reset Prisma migrations, run `pnpm model-schema reset`.
- To generate Prisma client, run `pnpm model-schema generate`.
- To create demo data, run `pnpm model-schema seed` (after starting application).

### Start development

```
pnpm dev
```

The application will be at http://localhost:4000.

### Run tests

- To run tests during development or debugging, use `pnpm test:start-app` and `pnpm test`.
- To run tests entirely with auto cleanup and coverage collection in one command, use `pnpm test-full`.
- Playwright report is created in `build/test/reports/playwright/index.html`.
- Coverage report is created in `build/test/reports/coverage/index.html`.
- To serve test reports, run `pnpm serve-test-reports`.

### Compile code (TypeScript)

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
