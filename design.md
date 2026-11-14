# Design instructions for AI agents

This document is the visual and interaction source of truth for the project. Read it before changing page layout, components, styles, imagery, motion, or responsive behavior. Keep `COMPONENTS.md` aligned with component API changes.

## Current experience

The active home page is a visual history of artificial intelligence rendered from `Data/timeline.json`. The primary interaction is a vertical timeline with a viewport-fixed year navigator on the left at wide desktop widths, centered content cards, a compact horizontal navigator on smaller screens, and animated controls for jumping between years or moving to the previous and next event. Each event uses a category accent, chapter marker, active-card focus treatment, and pointer-driven perspective tilt on capable devices. The timeline replaces the earlier photography portfolio page; apply the design language below to the timeline rather than restoring the retired portfolio sections.

## Product character

Build an Apple-inspired editorial timeline with a calm, premium, spacious feel. The experience should feel tactile, chronological, and quietly expressive rather than busy or dashboard-like.

Prioritize:

- Strong typographic hierarchy and generous negative space.
- Clear hierarchy with short, confident copy.
- Soft Liquid Glass surfaces over warm, colorful image and aurora backgrounds.
- Restrained motion that supports discovery without distracting from the work.
- A polished mobile experience, not a compressed desktop layout.

## Visual language

- Keep the site light-only. Do not add dark-mode token overrides or dark-theme UI.
- Use rounded media frames and glass surfaces with subtle borders, translucency, blur, and shadow.
- Let imagery provide most of the color. UI chrome stays neutral and restrained.
- Use the existing `.glass` and `.glass-pill` materials instead of recreating glass effects locally.
- Keep controls compact and pill-shaped when they represent actions; use circular glass controls for icon-only actions.
- Avoid excessive borders, gradients, drop shadows, saturated UI colors, dense cards, and decorative effects that compete with photography.

## Design tokens

Define or adjust tokens in `app/globals.css` under `:root` and the `@theme inline` block. Prefer semantic tokens over hardcoded values.

Current semantic tokens include:

- `background` — page background.
- `foreground` — primary text.
- `surface` — elevated or glass-adjacent surface color.
- `muted` — secondary text and quiet UI.
- `accent` — restrained emphasis and primary actions.
- `hairline` — subtle borders and separators.
- `font-display` — display typography stack.

Use Tailwind utilities mapped to these tokens, such as `bg-background`, `text-foreground`, and `text-muted`. When a glass button needs a solid fill, pair its color utility with `bg-none` because the glass material uses a background image.

## Typography

- Use the existing Geist and Geist Mono font setup from `app/layout.tsx` unless the task explicitly changes typography.
- Use the display stack and existing `Heading` sizes for prominent editorial headings.
- Establish hierarchy through size, weight, line height, and whitespace before adding color.
- Keep paragraphs readable with a controlled measure; do not stretch body copy across the full viewport.
- Use uppercase or eyebrow labels sparingly for metadata, categories, and section context.

## Layout and spacing

- Compose pages from clear sections: navigation, hero, featured work, work grid, about, contact, and footer.
- Use a centered content rail with responsive horizontal padding.
- Give hero and feature content room to breathe; avoid stacking every element tightly at the top of the viewport.
- Use large rounded glass cards for timeline events and consistent vertical rhythm between milestones.
- Preserve intentional asymmetry through alternating desktop cards, but keep chronological reading order logical.
- Keep timeline data in `Data/timeline.json`; pass typed event data into reusable components through props.

## Responsive behavior

- Design mobile layouts deliberately from the start.
- Collapse navigation into the existing `MobileMenu` pattern on small screens.
- Let grids reduce columns progressively while preserving card readability and image aspect ratios.
- Keep buttons easy to tap and avoid controls that depend on hover.
- Ensure glass surfaces do not become too narrow, crowded, or visually opaque on mobile.
- Test both the desktop and mobile Home stories after meaningful layout changes.

## Component architecture

Respect the three-layer component model:

1. **Primitives** in `components/ui/` are single-purpose and site-agnostic.
2. **Composites** in `components/` combine primitives into reusable patterns.
3. **Sections** in `components/` compose page-level blocks.

Primitives should not contain page-specific copy or imagery. Content belongs in `app/page.tsx` and is passed through typed props. Reuse existing components such as `Button`, `IconButton`, `GlassCard`, `Heading`, `MediaFrame`, `ParallaxImage`, `FeatureTile`, and `GridTile` before creating new ones.

Use semantic HTML and preserve component API conventions. `Heading` separates semantic element choice from visual size. `StatCard` belongs inside a `<dl>`. Icon-only controls require accessible labels.

## Imagery and media

- Treat typography, date markers, and the timeline rail as the primary visual anchors.
- The timeline currently uses no event imagery. If media is added later, keep it subordinate to the event content and follow the existing `next/image` and alt-text rules.
- Preserve the existing portfolio media components for future routes, but do not add them to the timeline without a clear content need.

## Motion and interaction

- Motion should be purposeful and directly connected to browsing or depth: selected chapters may bloom into focus, the progress rail may advance, navigation may scroll smoothly, and cards may respond with restrained 3D perspective tilt on pointer devices.
- Use the existing `.parallax`, `.parallax-layer`, and `.reveal` patterns rather than adding ad hoc animation systems.
- Preserve hover scale on media while applying parallax to the wrapper layer.
- Respect `prefers-reduced-motion`: remove focus animations and smooth scrolling for users who opt out.
- Every interactive control needs a visible or programmatic state and a useful accessible name.
- Prefer native behavior such as the existing `<details>`-based mobile menu when it meets the interaction need.

## Accessibility and quality bar

- Maintain semantic heading order, landmarks, link purpose, focus visibility, and keyboard access.
- Keep text contrast readable against both the page background and glass surfaces.
- Do not communicate meaning through color alone.
- Preserve reduced-motion behavior and usable touch targets.
- Use `next/image`, responsive sizing, and intrinsic dimensions to avoid layout shift.
- Run `npm run lint` and `npm run build` after implementation changes. Run Storybook when component behavior or visual states change.

## Change checklist

Before finishing a design change, confirm:

- Existing tokens and components were reused where appropriate.
- The visual hierarchy still reads clearly at mobile and desktop widths.
- New copy and imagery remain in page data, not inside generic components.
- Glass, parallax, reveal, and reduced-motion patterns remain consistent.
- Interactive elements have accessible names and keyboard support.
- No dark-mode styling, unrelated redesign, or one-off hardcoded design system values were introduced.
