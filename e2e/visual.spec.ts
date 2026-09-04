import { expect, test } from "@playwright/test"

// Visual baselines are platform-specific; capture and compare them locally.
// On CI these tests are skipped — functional coverage lives in showcase.spec.ts.
test.skip(!!process.env.CI, "visual snapshots run locally only")

test.describe("visual regression", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`${theme} theme matches snapshot`, async ({ page }) => {
      await page.goto("/")
      await page.evaluate(
        (value) => window.localStorage.setItem("theme", value),
        theme,
      )
      await page.reload()
      await expect(
        page.getByRole("heading", { name: /build with the relay/i }),
      ).toBeVisible()
      await expect(page).toHaveScreenshot(`showcase-${theme}.png`, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.01,
      })
    })
  }
})
