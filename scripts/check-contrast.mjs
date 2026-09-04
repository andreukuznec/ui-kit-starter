// WCAG contrast check for semantic token pairs in src/index.css.
// Run: npm run tokens:check
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { parse, wcagContrast } from "culori"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const CSS_PATH = join(ROOT, "src/index.css")
const THRESHOLD = 4.5

const PAIRS = [
  ["background", "foreground"],
  ["card", "card-foreground"],
  ["popover", "popover-foreground"],
  ["primary", "primary-foreground"],
  ["secondary", "secondary-foreground"],
  ["muted", "muted-foreground"],
  ["accent", "accent-foreground"],
  ["destructive", "destructive-foreground"],
  ["success", "success-foreground"],
  ["warning", "warning-foreground"],
  ["info", "info-foreground"],
  ["sidebar", "sidebar-foreground"],
  ["sidebar-primary", "sidebar-primary-foreground"],
  ["sidebar-accent", "sidebar-accent-foreground"],
  // muted-foreground is also used as de-emphasis text on the page background
  ["background", "muted-foreground"],
]

// muted-foreground is de-emphasis text on background/card. If that cross-pair
// falls below 4.5:1, add `${theme}:background/muted-foreground` here instead of
// restyling the palette.
const ALLOWLIST = new Set()

function extractBlock(css, selector) {
  const pattern = new RegExp(`${selector}\\s*\\{`)
  const match = pattern.exec(css)
  if (!match) {
    throw new Error(`Could not find ${selector} block in ${CSS_PATH}`)
  }
  const open = match.index + match[0].length - 1
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++
    else if (css[i] === "}") {
      depth--
      if (depth === 0) return css.slice(open + 1, i)
    }
  }
  throw new Error(`Unclosed ${selector} block in ${CSS_PATH}`)
}

function parseTokens(block) {
  const tokens = new Map()
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi
  let match
  while ((match = re.exec(block))) {
    tokens.set(match[1], match[2].trim())
  }
  return tokens
}

function contrastRatio(background, foreground) {
  const bg = parse(background)
  const fg = parse(foreground)
  if (!bg || !fg) return null
  return wcagContrast(bg, fg)
}

const css = readFileSync(CSS_PATH, "utf8")
const themes = {
  dark: parseTokens(extractBlock(css, ":root")),
  light: parseTokens(extractBlock(css, "\\.light")),
}

const rows = []
let failures = 0

for (const [themeName, tokens] of Object.entries(themes)) {
  for (const [background, foreground] of PAIRS) {
    const bgValue = tokens.get(background)
    const fgValue = tokens.get(foreground)
    const pair = `${background} / ${foreground}`
    if (!bgValue || !fgValue) {
      rows.push({
        pair,
        theme: themeName,
        ratio: "—",
        status: "FAIL",
        note: `missing --${bgValue ? foreground : background}`,
      })
      failures++
      continue
    }
    const ratio = contrastRatio(bgValue, fgValue)
    if (ratio == null) {
      rows.push({
        pair,
        theme: themeName,
        ratio: "—",
        status: "FAIL",
        note: "unparsable color",
      })
      failures++
      continue
    }
    const allowKey = `${themeName}:${background}/${foreground}`
    const passes = ratio >= THRESHOLD
    const allowlisted = ALLOWLIST.has(allowKey)
    let status
    if (passes) status = "pass"
    else if (allowlisted) status = "allow"
    else {
      status = "FAIL"
      failures++
    }
    rows.push({ pair, theme: themeName, ratio: ratio.toFixed(2), status })
  }
}

const pairWidth = Math.max("Pair".length, ...rows.map((row) => row.pair.length))
const themeWidth = Math.max("Theme".length, ...rows.map((row) => row.theme.length))
const ratioWidth = Math.max("Ratio".length, ...rows.map((row) => String(row.ratio).length))
const statusWidth = Math.max("Status".length, ...rows.map((row) => row.status.length))

function pad(value, width) {
  return String(value).padEnd(width)
}

const header = `${pad("Pair", pairWidth)}  ${pad("Theme", themeWidth)}  ${pad("Ratio", ratioWidth)}  ${pad("Status", statusWidth)}`
const divider = `${"-".repeat(pairWidth)}  ${"-".repeat(themeWidth)}  ${"-".repeat(ratioWidth)}  ${"-".repeat(statusWidth)}`

console.log(`WCAG contrast (${THRESHOLD}:1) for tokens in src/index.css\n`)
console.log(header)
console.log(divider)
for (const row of rows) {
  const note = row.note ? `  ${row.note}` : ""
  console.log(
    `${pad(row.pair, pairWidth)}  ${pad(row.theme, themeWidth)}  ${pad(row.ratio, ratioWidth)}  ${pad(row.status, statusWidth)}${note}`,
  )
}

if (failures > 0) {
  console.error(`\n${failures} pair(s) below ${THRESHOLD}:1.`)
  process.exit(1)
}

console.log(`\nAll required pairs meet ${THRESHOLD}:1.`)
