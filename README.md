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

## Use a component

```tsx
import { Button } from "@/components/ui/button"

export function SaveButton() {
  return <Button>Save</Button>
}
```

Components live in `src/components/ui` and are meant to be edited with the
application. The `@` alias points to `src`.

## Customize the UI

Change the semantic variables in `src/index.css` to update colors, radius,
surfaces, charts, and sidebar styling across every component. Keep semantic
classes such as `bg-background`, `text-foreground`, and `border-border` in
feature code so themes remain consistent.

`src/index.css` uses dark tokens by default. The `.light` block contains the
light theme overrides. `next-themes` switches the class on the document root.

## Portability

The components target React and Tailwind CSS. The CSS variables are portable to
other web stacks, but Radix component implementations must be adapted outside
React.

This starter intentionally excludes Relay API code, authentication, workspace
branding, board behavior, drag-and-drop, React Query, Storybook, and publishing
infrastructure.
