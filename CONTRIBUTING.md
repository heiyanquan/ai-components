# Contributing to pro-components

## Set up

Install dev deps after git clone the repo.

```bash
$ pnpm i
```

run start

```bash
$ pnpm start
```

## Build

Transform with babel and rollup.

```bash
$ pnpm build

# Build and monitor file changes
$ pnpm build --watch

# Build specified package only
$ PACKAGE=plugin-antd pnpm build --watch
```

## Test

Run test.

```bash
pnpm test

# Test specified file and watch
pnpm test getMockData.test.js -w

# Test specified package
pnpm test --package core

# Generate coverage
pnpm test --coverage
```

## Release

```bash
pnpm --filter '@zs-ai/**' build
npm run release -- --tag=latest
npm run release
npm run release -- --publish-only
npm run release -- --skip-git-status-check
npm run release -- --skip-build
npm run release -- --conventional-graduate
```

## Create new package

Such as creating package `foo`.

```bash
$ mkdir -p packages/foo
$ pnpm bootstrap
```

Then you will find the `README.md` and `package.json` is generated in `packages/foo`.

```bash
$ tree packages/foo
packages/foo
├── README.md
└── package.json
```

