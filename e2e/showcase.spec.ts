import { expect, test } from "@playwright/test"

test.describe("showcase", () => {
  test("command palette opens with ctrl+k and toggles theme", async ({ page }) => {
    await page.goto("/")

    await page.keyboard.press("Control+k")
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Command palette" }),
    ).toBeAttached()

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
    await page.locator("button[data-day]").nth(14).click()
    await page.keyboard.press("Escape")

    await page.getByRole("button", { name: "Create project" }).click()
    await expect(page.getByText("Project created")).toBeVisible()
    await expect(page.getByRole("textbox", { name: "Project name" })).toHaveValue("")
  })

  test("chart and table render", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: "Charts" })).toBeVisible()
    await expect(page.locator(".recharts-bar-rectangle").first()).toBeVisible()
    await expect(page.getByRole("cell", { name: "Design tokens" })).toBeVisible()
  })
})
