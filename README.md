# UI Kit Starter

A minimal React starter containing Relay's editable shadcn-style components,
semantic CSS tokens, dark and light themes, and a component showcase.

Built with Vite 7, React 19, Tailwind CSS 4 (CSS-first config, OKLCH tokens),
Radix primitives (`radix-ui` meta-package), and the React Compiler.

## Run it

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

Lint, unit tests (jsdom + axe), and e2e (Playwright):

```bash
npm run lint
npm test
npm run test:e2e
```

Visual regression snapshots live in `e2e/visual.spec.ts-snapshots`. They run on
Linux (including CI) and are skipped on Windows/macOS. Regenerate baselines on
Linux after intentional visual changes:

```bash
npx playwright test e2e/visual.spec.ts --update-snapshots
```

## Use a component

```tsx
import { Button } from "@/components/ui/button"

export function SaveButton() {
  return <Button>Save</Button>
}
```

Components live in `src/components/ui` and are meant to be edited with the
application. The `@` alias points to `src`.

Included: accordion, alert, alert-dialog, avatar, badge, breadcrumb, button,
calendar, card, chart, checkbox, collapsible, combobox, command, data-table,
date-range-picker, dialog, dropdown-menu, empty, form (react-hook-form + zod),
hover-card, input, kbd, label, multi-select, pagination, popover, progress,
radio-group, scroll-area, select, separator, sheet, sidebar, skeleton, slider,
sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group, tooltip —
plus `ThemeProvider` (`src/components/theme-provider.tsx`) and the `use-mobile`
hook.

## Add a shadcn component

`components.json` is the shadcn CLI config for this Vite app (`rsc: false`).
From the project root:

```bash
npx shadcn@latest add checkbox
```

The CLI writes into `src/components/ui` using the aliases in `components.json`
and the `paths` mapping in `tsconfig.json`. Edit the generated file like any
other application source.

## Customize the UI

There is no `tailwind.config.*` — Tailwind CSS 4 is configured in CSS. All
design tokens live in `src/index.css`:

- `:root` holds the dark theme (default), `.light` overrides it.
- `@theme inline` maps the semantic variables to Tailwind utilities
  (`bg-primary`, `text-muted-foreground`, `rounded-md`, …).
- Colors are OKLCH — edit lightness/chroma directly for predictable results
  across themes.

`ThemeProvider` stores `dark`, `light`, or `system` in `localStorage` (`theme`)
and sets the resolved `light` or `dark` class on `<html>`. `system` follows
`prefers-color-scheme`, updates when the OS preference changes, and syncs
across tabs via `storage` events. An inline script in `index.html` applies the
resolved class before the bundle loads, so the selected theme does not flash.

To add a brand palette, override the same CSS variables under a class or
`[data-theme="brand"]` selector (on `<html>` or a subtree). `ThemeProvider`
still toggles only `.light` / `.dark`; your selector can combine with those:

```css
[data-theme="brand"] {
  --primary: oklch(0.55 0.18 250);
  --primary-foreground: oklch(1 0 0);
}

[data-theme="brand"].light {
  --primary: oklch(0.48 0.2 250);
}
```

Set `data-theme="brand"` yourself (or swap the values in `:root` / `.light`).

### Token list

| Token                                                | Typical classes                                        |
| ---------------------------------------------------- | ------------------------------------------------------ |
| `--background` / `--foreground`                      | `bg-background` `text-foreground`                      |
| `--card` / `--card-foreground`                       | `bg-card` `text-card-foreground`                       |
| `--popover` / `--popover-foreground`                 | `bg-popover` `text-popover-foreground`                 |
| `--primary` / `--primary-foreground`                 | `bg-primary` `text-primary-foreground`                 |
| `--secondary` / `--secondary-foreground`             | `bg-secondary` `text-secondary-foreground`             |
| `--muted` / `--muted-foreground`                     | `bg-muted` `text-muted-foreground`                     |
| `--accent` / `--accent-foreground`                   | `bg-accent` `text-accent-foreground`                   |
| `--destructive` / `--destructive-foreground`         | `bg-destructive` `text-destructive-foreground`         |
| `--success` / `--success-foreground`                 | `bg-success` `text-success-foreground`                 |
| `--warning` / `--warning-foreground`                 | `bg-warning` `text-warning-foreground`                 |
| `--info` / `--info-foreground`                       | `bg-info` `text-info-foreground`                       |
| `--border`                                           | `border-border`                                        |
| `--input`                                            | `border-input`                                         |
| `--ring`                                             | `ring-ring`                                            |
| `--radius`                                           | `rounded-lg` / `rounded-md` / `rounded-sm`             |
| `--chart-1` … `--chart-5`                            | `bg-chart-1` … `bg-chart-5`                            |
| `--sidebar`                                          | `bg-sidebar`                                           |
| `--sidebar-foreground`                               | `text-sidebar-foreground`                              |
| `--sidebar-primary` / `--sidebar-primary-foreground` | `bg-sidebar-primary` `text-sidebar-primary-foreground` |
| `--sidebar-accent` / `--sidebar-accent-foreground`   | `bg-sidebar-accent` `text-sidebar-accent-foreground`   |
| `--sidebar-border`                                   | `border-sidebar-border`                                |
| `--sidebar-ring`                                     | `ring-sidebar-ring`                                    |
| `--font-sans`                                        | `font-sans`                                            |
| `--font-mono`                                        | `font-mono`                                            |
| `--ease-out-expo` / `--ease-in-out-soft`             | `ease-out-expo` `ease-in-out-soft`                     |
| `--transition-duration-fast` / `-normal` / `-slow`   | `duration-fast` `duration-normal` `duration-slow`      |

Inter Variable is loaded from `@fontsource-variable/inter` and used as the first
family in the `body` stack (`font-sans`). `font-mono` uses the system UI
monospace stack.

## Component registry

`registry.json` describes every component in the shadcn registry format. Build
distributable JSON (into `public/r`) with:

```bash
npm run registry:build
```

Vite copies `public/` to the site root, so hosting the app (or just `public/r`)
serves `/r/registry.json` (the catalog) and `/r/<name>.json` (each item). CI
fails if `public/r` drifts from a fresh build.

Direct URL install still works:

```bash
npx shadcn@latest add https://your-host/r/button.json
```

### Install via namespaced registry

Consumers that already have a shadcn `components.json` can alias this kit as
`@relay`. Point `{name}` at the built item files:

```json
{
  "registries": {
    "@relay": "https://<host>/r/{name}.json"
  }
}
```

Then:

```bash
npx shadcn@latest add @relay/button
```

`{name}` is replaced with the item name (`button` → `/r/button.json`). Search
and list use the same pattern with `registry` (`/r/registry.json`).

### MCP

The [shadcn MCP server](https://ui.shadcn.com/docs/mcp) reads `registries` from
the project's `components.json` and can browse, search, and install from
`@relay`. Add the server to the AI client, then configure the registry URL as
above.

Init (Claude Code example):

```bash
npx shadcn@latest mcp init --client claude
```

Or a project MCP config (Cursor: `.cursor/mcp.json`; Claude Code: `.mcp.json`):

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

VS Code Copilot uses `.vscode/mcp.json` with a top-level `"servers"` key
instead of `"mcpServers"`. After the server is connected, prompts like “show
components from the @relay registry” or `npx shadcn@latest add @relay/button`
resolve against this kit.

## Quality

| Check          | Command                                           |
| -------------- | ------------------------------------------------- |
| Format         | `npm run format` / `format:check` (Prettier)      |
| Lint           | `npm run lint`                                    |
| Types          | `npm run typecheck`                               |
| Unit + axe     | `npm test` (vitest, jsdom)                        |
| E2e + visual   | `npm run test:e2e` (Playwright; visual: Linux)    |
| Token contrast | `npm run tokens:check` (WCAG)                     |
| Bundle budget  | `npx size-limit` after `npm run build`            |
| Registry drift | `npm run registry:build` then `git diff public/r` |

Lint includes perfectionist import sort, jsx-a11y, a kit/app import boundary,
and eslint-plugin-storybook.

## Storybook

Isolated stories for every kit component, with a dark/light theme toolbar and
the a11y addon:

```bash
npm run storybook
```

Static build:

```bash
npm run build-storybook
```

Stories are colocated as `*.stories.tsx` next to each component. They compose
kit primitives only — they do not import the showcase app.

## Portability

The components target React and Tailwind CSS. The CSS variables are portable to
other web stacks, but Radix component implementations must be adapted outside
React.

This starter intentionally excludes Relay API code, authentication, workspace
branding, board behavior, drag-and-drop, React Query, and publishing
infrastructure.
