# Codex project instructions

`AGENTS.md` is the canonical project instruction file. Read it before making changes, including its requirement to consult the version-matched Next.js documentation in `node_modules/next/dist/docs/`.

Also read `CLAUDE.md` for the project commands, architecture, and current implementation notes, and `design.md` for the visual and interaction source of truth. Keep these files in sync when project conventions change.

## Working rules

- Use the Next.js App Router in `app/` and TypeScript with strict typing.
- Reuse existing components, design tokens, and patterns before introducing new ones.
- Keep server and client components intentional; add `"use client"` only when browser interactivity or client-only APIs require it.
- Keep static media in `public/portfolio/` and use `next/image` for portfolio images.
- Run `npm run lint` and `npm run build` after code changes when practical.
- Do not commit secrets, generated output, or changes unrelated to the requested task.
