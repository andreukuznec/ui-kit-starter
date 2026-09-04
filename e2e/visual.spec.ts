import { expect, type Page, test } from "@playwright/test"

// Fonts and subpixel antialiasing differ by OS. Baselines are Linux-only
// so CI (ubuntu-latest) is the source of truth; skip on Windows/macOS.
test.skip(process.platform !== "linux", "visual snapshots run on Linux")

const screenshotOptions = {
  animations: "disabled" as const,
  maxDiffPixelRatio: 0.01,
}

const showcaseCards = [
  "Actions and status",
  "Selection and inputs",
  "Progress and status",
  "Forms and validation",
  "Overlays and feedback",
  "Disclosure and loading",
  "Charts",
  "Surfaces and empty states",
  "Data table",
] as const

function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function prepareTheme(page: Page, theme: "dark" | "light") {
  await page.goto("/")
  await page.evaluate((value) => window.localStorage.setItem("theme", value), theme)
  await page.reload()
  await expect(page.getByRole("heading", { name: /build with the relay/i })).toBeVisible()
  await expect(page.locator(".recharts-bar-rectangle").first()).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
}

test.describe("visual regression", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`${theme} theme matches per-section snapshots`, async ({ page }) => {
      await prepareTheme(page, theme)

      await expect(page.locator('[data-slot="sidebar"]')).toHaveScreenshot(
        `sidebar-${theme}.png`,
        screenshotOptions,
      )
      await expect(page.locator("header")).toHaveScreenshot(
        `header-${theme}.png`,
        screenshotOptions,
      )

      // Sticky header would overlay cards that Playwright scrolls into view.
      await page.locator("header").evaluate((el) => {
        el.style.position = "relative"
      })

      const cards = page.locator('[data-slot="card"]')
      const titles = (await cards.locator('[data-slot="card-title"]').allInnerTexts()).map(
        (title) => title.trim(),
      )
      expect(titles).toEqual([...showcaseCards])

      for (const title of showcaseCards) {
        const card = cards.filter({
          has: page.getByRole("heading", { name: title, exact: true }),
        })
        if (title === "Charts") {
          await expect(card.locator(".recharts-bar-rectangle").first()).toBeVisible()
        }
        await expect(card).toHaveScreenshot(
          `card-${slugify(title)}-${theme}.png`,
          screenshotOptions,
        )
      }
    })
  }
})
