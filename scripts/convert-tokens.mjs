// One-off: convert the HSL token palette in src/index.css to OKLCH.
// Run: node scripts/convert-tokens.mjs
import { formatCss, converter } from "culori"

const toOklch = converter("oklch")

const dark = {
  background: [228, 10, 8],
  foreground: [220, 18, 91],
  card: [225, 9, 12],
  "card-foreground": [220, 18, 91],
  popover: [225, 10, 13],
  "popover-foreground": [220, 18, 91],
  primary: [252, 82, 68],
  "primary-foreground": [240, 20, 98],
  secondary: [225, 8, 17],
  "secondary-foreground": [220, 14, 88],
  muted: [225, 8, 16],
  "muted-foreground": [222, 8, 57],
  accent: [252, 28, 20],
  "accent-foreground": [252, 92, 84],
  destructive: [0, 68, 55],
  "destructive-foreground": [0, 0, 100],
  border: [225, 8, 20],
  input: [225, 8, 22],
  ring: [252, 82, 68],
  "chart-1": [252, 82, 68],
  "chart-2": [160, 62, 48],
  "chart-3": [38, 92, 58],
  "chart-4": [200, 78, 56],
  "chart-5": [350, 78, 62],
  sidebar: [228, 11, 7],
  "sidebar-foreground": [220, 14, 84],
  "sidebar-primary": [252, 82, 68],
  "sidebar-primary-foreground": [240, 20, 98],
  "sidebar-accent": [225, 9, 14],
  "sidebar-accent-foreground": [220, 18, 94],
  "sidebar-border": [225, 8, 17],
  "sidebar-ring": [252, 82, 68],
}

const light = {
  background: [220, 20, 98],
  foreground: [225, 16, 13],
  card: [0, 0, 100],
  "card-foreground": [225, 16, 13],
  popover: [0, 0, 100],
  "popover-foreground": [225, 16, 13],
  primary: [252, 70, 56],
  "primary-foreground": [0, 0, 100],
  secondary: [220, 16, 94],
  "secondary-foreground": [225, 14, 20],
  muted: [220, 16, 94],
  "muted-foreground": [220, 8, 45],
  accent: [252, 65, 94],
  "accent-foreground": [252, 48, 34],
  destructive: [0, 72, 51],
  "destructive-foreground": [0, 0, 100],
  border: [220, 14, 88],
  input: [220, 14, 84],
  ring: [252, 70, 56],
  "chart-1": [252, 70, 56],
  "chart-2": [160, 50, 36],
  "chart-3": [38, 80, 46],
  "chart-4": [200, 65, 42],
  "chart-5": [350, 65, 48],
  sidebar: [220, 20, 97],
  "sidebar-foreground": [225, 14, 20],
  "sidebar-primary": [252, 70, 56],
  "sidebar-primary-foreground": [0, 0, 100],
  "sidebar-accent": [220, 16, 94],
  "sidebar-accent-foreground": [225, 16, 13],
  "sidebar-border": [220, 14, 88],
  "sidebar-ring": [252, 70, 56],
}

function printBlock(name, tokens) {
  console.log(`  /* ${name} */`)
  for (const [token, [h, s, l]] of Object.entries(tokens)) {
    const oklch = toOklch({ mode: "hsl", h, s: s / 100, l: l / 100 })
    console.log(`  --${token}: ${formatCss(oklch)};`)
  }
}

printBlock("dark (:root)", dark)
console.log("")
printBlock("light (.light)", light)
