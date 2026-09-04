import { expect, test } from "@playwright/test"

// Fonts and subpixel antialiasing differ by OS. Baselines are Linux-only
// so CI (ubuntu-latest) is the source of truth; skip on Windows/macOS.
test.skip(process.platform !== "linux", "visual snapshots run on Linux")

test.describe("visual regression", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`${theme} theme matches snapshot`, async ({ page }) => {
      await page.goto("/")
      await page.evaluate((value) => window.localStorage.setItem("theme", value), theme)
      await page.reload()
      await expect(page.getByRole("heading", { name: /build with the relay/i })).toBeVisible()
      await expect(page.locator(".recharts-bar-rectangle").first()).toBeVisible()
      await page.evaluate(() => document.fonts.ready)
      await expect(page).toHaveScreenshot(`showcase-${theme}.png`, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.01,
      })
    })
  }
})
