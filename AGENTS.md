# Project guidelines

Keep changes focused on the requested work. Preserve existing behavior, public contracts, and local conventions unless the request changes them. Do not turn a one-off request into a project-wide convention.

## Working principles

Before editing, inspect the relevant package and lockfile, route and app structure, theme/provider setup, nearby code, and available checks. Follow the installed Next.js and MUI APIs rather than assuming current documentation applies.

Start from the closest established pattern. Treat a new dependency, component library, styling system, provider, or cache as an architectural change that requires explicit user direction. When guidance and the repository disagree, follow the repository unless the user asks to change it.

Choose the smallest change that meets the requirement. Keep decisions explainable, preserve accessibility and responsive behavior, and report validation honestly.

## UI, layout, and typography

Use MUI when it provides a suitable component. Reuse the shared theme and component defaults before adding local values or overrides.

Choose the narrowest styling scope that keeps the result clear: use `sx` for short, local, theme-aware adjustments; a colocated CSS Module or nearby `styled` pattern for substantial, repeated, or stateful styling; theme `components` overrides for shared defaults; and `CssBaseline` or global styles only for application-wide baselines. Avoid letting `sx` become a page stylesheet or adding a second styling system.

Prefer theme-aware styling to ordinary inline `style`. Avoid `!important`, broad global selectors, duplicate declarations, and undocumented MUI internals; if an exception is needed, keep it scoped, stable, and easy to explain. Use documented slots and stable `Mui[Component]-[slot]` fragments rather than generated class names, and scope MUI state classes to the relevant component root.

Prefer default component styling. Make styling or layout exceptions only when content, interaction, accessibility, or a documented visual requirement calls for them; keep those exceptions local and explicit.

Use the simplest parent layout that expresses the intended structure. For sibling spacing, prefer a parent `Stack`, flex, grid, or MUI `List` with `gap` when practical. Use padding for internal space, and use margin when it expresses a local outer relationship that the parent layout cannot represent cleanly. Keep spacing, alignment, and layout exceptions consistent with the surrounding UI.

Use MUI `Typography` variants and the shared theme when text needs a typographic role, scale, or weight. Use semantic native elements such as `span`, `strong`, and `label` for inline or semantic text when no Typography variant is needed. Avoid text micro-typography overrides unless they serve a clear design requirement.

For MUI `Typography`, avoid setting `component` and `variant` together by default. Use `variant` on its own when it fully conveys the required output. Add `component` alongside `variant` only when a distinct rendered element is required for DOM semantics, valid nesting, inline/list/container layout, or an explicit contract; keep that exception local and explainable.

## Component and page structure

Organize pages around meaningful visual or behavioral regions. Extract or reuse components when doing so improves cohesion, consistency, or a domain boundary; avoid both oversized page components and needless wrappers. Keep nontrivial data transformations and state transitions out of large JSX expressions, and use types that reflect the domain data.

Use semantic HTML and accessible names, keyboard interaction, visible states, and focus behavior. Build responsive layouts from the intended hierarchy and existing breakpoints. Preserve existing app behavior and data contracts unless the request explicitly changes them.

Do not introduce `aria-label` or `aria-labelledby` automatically. Use either attribute only when the user explicitly requests it; do not add them as proactive accessibility annotations or propagate them to similar elements.

Do not add an `id` to `Typography` solely to support an automatically added accessibility attribute. Keep a `Typography` id only when an explicit functional contract requires it, and remove any now-unused id or accessibility-attribute references together.

In JSX opening tags, place shorthand attributes without a value before attributes with a value. Within each group, order attributes by property-name length from short to long, retaining the existing relative order when names have the same length. Apply this rule only to JSX attributes, not object keys, destructuring, types, or imports.

## API and data-fetching architecture

Organize frontend API code by business domain as endpoints grow:

```text
lib/
├─ api/
│  ├─ client.ts       # Shared HTTP transport and ApiError
│  ├─ auth.ts         # Authentication endpoints and types
│  └─ <domain>.ts     # Other domain endpoints and types
├─ hooks/
│  └─ use-<action>.ts # Client-side SWR hooks
└─ session-storage.ts
```

- Keep `lib/api/client.ts` React-independent. It owns the API base URL, native `fetch`, request/response parsing, shared HTTP methods, and `ApiError`; do not add React or SWR imports there.
- Keep endpoint functions and their request/response types in `lib/api/<domain>.ts`. Keep client-side SWR hooks in `lib/hooks/`, mark them `"use client"`, and use action-specific names when they represent a specific domain action.
- Hooks may call domain API functions but must not add another `fetch` implementation. Pages and components must not call native `fetch` directly.
- Use explicit imports such as `@lib/api/client`, `@lib/api/auth`, and `@lib/hooks/use-sign-in`. Keep domain types close to their API functions and use type-only imports where appropriate.
- Keep `NEXT_PUBLIC_API_BASE_URL` in environment configuration. Do not hardcode deployment-specific hostnames, credentials, certificates, or connection endpoints in TypeScript.

## Visual work and verification

For screenshot-driven work, inspect the reference dimensions, regions, hierarchy, repeated elements, responsive behavior, and uncertain details before coding. Implement in small, reviewable files following repository naming and routing conventions. When browser inspection is available, compare the rendered page at the reference viewport, address the largest differences first, then inspect a narrow viewport. Do not claim visual verification when no rendering was performed.

Before completion, review the diff for duplicated styling, unused code, accidental dependency or configuration changes, and regressions to nearby behavior. For API changes, run `npm run lint` and `npm run build`. For user-visible request or interaction changes, verify the real browser request and rendered behavior when the runtime environment is available. Report exactly what ran and what could not be checked.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
