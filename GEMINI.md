# Gemini project instructions

This is a Next.js 16.3 App Router project. Before writing code, read `AGENTS.md` and the relevant version-matched guide under `node_modules/next/dist/docs/`. `CLAUDE.md` contains the current project conventions and implementation notes; `design.md` is the visual and interaction source of truth.

## Project commands

- `npm run dev` — start the development server.
- `npm run lint` — run ESLint.
- `npm run build` — create a production build and type-check the project.

## Project conventions

- Use TypeScript, React 19, and the `app/` App Router.
- Use the `@/*` path alias for imports from the repository root.
- Prefer existing components and patterns in `components/` and `app/`.
- Extend design tokens in `app/globals.css` rather than hardcoding colors.
- Preserve the light-only Liquid Glass visual system and reduced-motion behavior.
- Keep interactive browser-only code in client components; leave static UI as server components.
- Use `next/image` for local portfolio images in `public/portfolio/`.
- Verify changes with lint and build when practical, and avoid unrelated edits.
