# UI Kit Starter

A minimal React starter containing Relay's editable shadcn-style components,
semantic CSS tokens, dark and light themes, and a component showcase.

Built with Vite 7, React 19, Tailwind CSS 4 (CSS-first config, OKLCH tokens),
Radix primitives, and the React Compiler.

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

Included: accordion, badge, button, calendar, card, chart, command, dialog,
dropdown-menu, form (react-hook-form + zod), input, label, popover, select,
separator, sheet, sidebar, skeleton, sonner, table, textarea, tooltip — plus
`ThemeProvider` (`src/components/theme-provider.tsx`) and the `use-mobile` hook.

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

`ThemeProvider` stores the choice in `localStorage` (`theme`) and sets `light`
or `dark` on `<html>`. An inline script in `index.html` applies that class
before the bundle loads, so the selected theme does not flash.

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

Inter Variable is loaded from `@fontsource-variable/inter` and used as the first
family in the `body` stack.

## Component registry

`registry.json` describes every component in the shadcn registry format. Build
distributable JSON (into `public/r`) with:

```bash
npm run registry:build
```

Serve the app (or just `public/r`) over HTTP and others can install components
directly:

```bash
npx shadcn@latest add https://your-host/r/button.json
```

## Portability

The components target React and Tailwind CSS. The CSS variables are portable to
other web stacks, but Radix component implementations must be adapted outside
React.

This starter intentionally excludes Relay API code, authentication, workspace
branding, board behavior, drag-and-drop, React Query, Storybook, and publishing
infrastructure.
