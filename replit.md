# Moheb Yasser Portfolio

A responsive single-page developer portfolio for Moheb Yasser, featuring his Flutter engineering work and Cosmic I Book case study.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/moheb-portfolio/src/App.tsx` — portfolio content, navigation, contact form behavior, and page structure
- `artifacts/moheb-portfolio/src/index.css` — site theme, responsive layout utilities, animation, and visual system
- `artifacts/moheb-portfolio/.replit-artifact/artifact.toml` — artifact routing and managed web workflow

## Architecture decisions

- The portfolio is frontend-only; the contact form prepares a `mailto:` message and shows in-page feedback instead of requiring a backend.
- Project gallery frames intentionally use labeled placeholders until the real Cosmic I Book screenshots are supplied.
- The site uses anchor-based single-page navigation with an active-section observer so the fixed navigation remains useful while scrolling.

## Product

The site introduces Moheb's positioning, engineering philosophy, Cosmic I Book project, technical toolkit, and contact links in a focused presentation for potential collaborators and clients.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
