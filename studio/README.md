# Villa Susane Sanity Studio

This Studio is configured for Sanity project `rghbiwhc` and dataset `production`.

## Run Locally

```bash
npm install
npm run dev
```

Open the local Studio URL shown in the terminal, usually `http://localhost:3333`.

## Deploy Studio

```bash
npm run deploy
```

The deploy command runs `sanity deploy` and will ask you to choose a Studio hostname if one has not been set yet.

## Schemas

All schema files in `schemaTypes/` are registered from `schemaTypes/index.ts`.
