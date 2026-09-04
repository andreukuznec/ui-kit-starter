# UI Kit Starter

A minimal React starter containing Relay's editable shadcn-style components,
semantic CSS tokens, dark and light themes, and a component showcase.

## Run it

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

Lint and tests:

```bash
npm run lint
npm test
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

## Add a shadcn component

`components.json` is the shadcn CLI config for this Vite app (`rsc: false`).
From the project root:

```bash
npx shadcn@latest add checkbox
```

The CLI writes into `src/components/ui` using the aliases in `components.json`.
Edit the generated file like any other application source.

## Customize the UI

Change the semantic variables in `src/index.css` to update colors, radius,
surfaces, charts, and sidebar styling across every component. Keep semantic
classes such as `bg-background`, `text-foreground`, and `border-border` in
feature code so themes remain consistent.

`:root` holds the dark tokens (default). The `.light` block overrides them for
the light theme. `ThemeProvider` in `src/components/theme-provider.tsx` stores
the choice in `localStorage` (`theme`) and sets `light` or `dark` on `<html>`.
An inline script in `index.html` applies that class before the bundle loads so
the selected theme does not flash.

### Token list

| Token | Typical classes |
| --- | --- |
| `--background` / `--foreground` | `bg-background` `text-foreground` |
| `--card` / `--card-foreground` | `bg-card` `text-card-foreground` |
| `--popover` / `--popover-foreground` | `bg-popover` `text-popover-foreground` |
| `--primary` / `--primary-foreground` | `bg-primary` `text-primary-foreground` |
| `--secondary` / `--secondary-foreground` | `bg-secondary` `text-secondary-foreground` |
| `--muted` / `--muted-foreground` | `bg-muted` `text-muted-foreground` |
| `--accent` / `--accent-foreground` | `bg-accent` `text-accent-foreground` |
| `--destructive` / `--destructive-foreground` | `bg-destructive` `text-destructive-foreground` |
| `--border` | `border-border` |
| `--input` | `border-input` |
| `--ring` | `ring-ring` |
| `--radius` | `rounded-lg` / `rounded-md` / `rounded-sm` |
| `--chart-1` … `--chart-5` | `bg-chart-1` … `bg-chart-5` |
| `--sidebar` | `bg-sidebar` |
| `--sidebar-foreground` | `text-sidebar-foreground` |
| `--sidebar-primary` / `--sidebar-primary-foreground` | `bg-sidebar-primary` `text-sidebar-primary-foreground` |
| `--sidebar-accent` / `--sidebar-accent-foreground` | `bg-sidebar-accent` `text-sidebar-accent-foreground` |
| `--sidebar-border` | `border-sidebar-border` |
| `--sidebar-ring` | `ring-sidebar-ring` |

Inter Variable is loaded from `@fontsource-variable/inter` and used as the first
family in the `body` stack.

## Portability

The components target React and Tailwind CSS. The CSS variables are portable to
other web stacks, but Radix component implementations must be adapted outside
React.

This starter intentionally excludes Relay API code, authentication, workspace
branding, board behavior, drag-and-drop, React Query, Storybook, and publishing
infrastructure.
