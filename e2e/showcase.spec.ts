import { expect, test } from "@playwright/test"

test.describe("showcase", () => {
  test("command palette opens with ctrl+k and toggles theme", async ({ page }) => {
    await page.goto("/")

    await page.keyboard.press("Control+k")
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(page.getByRole("heading", { name: "Command palette" })).toBeAttached()

    await page.getByRole("option", { name: /toggle theme/i }).click()
    await expect(page.getByRole("dialog")).not.toBeVisible()
    await expect(page.locator("html")).toHaveClass(/light/)
  })

  test("form validates and submits", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("button", { name: "Create project" }).click()
    await expect(page.getByText("Give the project at least 3 characters.")).toBeVisible()

    await page.getByRole("textbox", { name: "Project name" }).fill("Mobile redesign")
    await page.getByRole("button", { name: "Due date" }).click()
    const midMonth = await page.evaluate(() => {
      const date = new Date()
      date.setDate(15)
      return date.toLocaleDateString()
    })
    await page.locator(`button[data-day="${midMonth}"]`).click()
    await page.keyboard.press("Escape")

    await page.getByRole("button", { name: "Create project" }).click()
    await expect(page.getByText("Project created")).toBeVisible()
    await expect(page.getByRole("textbox", { name: "Project name" })).toHaveValue("")
  })

  test("sidebar navigates to showcase sections", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("link", { name: "Charts" }).click()
    await expect(page).toHaveURL(/#charts$/)
    await expect(page.locator("#charts")).toBeInViewport()
    await expect(page.getByRole("link", { name: "Charts" })).toHaveAttribute("aria-current", "page")

    await page.getByRole("link", { name: "Settings" }).click()
    await expect(page).toHaveURL(/#settings$/)
    await expect(page.locator("#settings")).toBeInViewport()
    await expect(page.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "aria-current",
      "page",
    )
  })

  test("chart and table render", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: "Charts" })).toBeVisible()
    await expect(page.locator(".recharts-bar-rectangle").first()).toBeVisible()
    await expect(page.getByRole("cell", { name: "Design tokens" })).toBeVisible()
  })
})
