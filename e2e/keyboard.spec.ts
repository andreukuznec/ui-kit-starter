import { expect, test } from "@playwright/test"

test.describe("keyboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { name: /build with the relay/i })).toBeVisible()
  })

  test("dialog traps focus and returns it to the trigger on escape", async ({ page }) => {
    const trigger = page.getByRole("button", { name: "Open dialog" })
    await trigger.click()

    const dialog = page.getByRole("dialog", { name: /create a workspace/i })
    await expect(dialog).toBeVisible()
    await expect(dialog.locator(":focus")).toHaveCount(1)

    const tabStops = await dialog.getByRole("button").count()
    for (let i = 0; i < tabStops + 2; i++) {
      await page.keyboard.press("Tab")
      await expect(dialog.locator(":focus")).toHaveCount(1)
    }

    await page.keyboard.press("Escape")
    await expect(dialog).not.toBeVisible()
    await expect(trigger).toBeFocused()
  })

  test("sheet opens and closes with escape", async ({ page }) => {
    await page.getByRole("button", { name: "Open sheet" }).click()

    const sheet = page.getByRole("dialog", { name: "Details" })
    await expect(sheet).toBeVisible()

    await page.keyboard.press("Escape")
    await expect(sheet).not.toBeVisible()
  })

  test("command palette opens with ctrl+k and moves the active option", async ({ page }) => {
    await page.keyboard.press("Control+k")

    const palette = page.getByRole("dialog", { name: "Command palette" })
    await expect(palette).toBeVisible()

    const create = page.getByRole("option", { name: /create project/i })
    const toggleTheme = page.getByRole("option", { name: /toggle theme/i })
    await expect(create).toHaveAttribute("data-selected", "true")

    await page.keyboard.press("ArrowDown")
    await expect(toggleTheme).toHaveAttribute("data-selected", "true")

    await page.keyboard.press("ArrowUp")
    await expect(create).toHaveAttribute("data-selected", "true")

    await page.keyboard.press("Escape")
    await expect(palette).not.toBeVisible()
  })

  test("dropdown menu opens from the keyboard and returns focus", async ({ page }) => {
    const trigger = page.getByRole("button", { name: "Open card menu" })
    await trigger.focus()
    await page.keyboard.press("Enter")

    const menu = page.getByRole("menu")
    await expect(menu).toBeVisible()
    await expect(page.getByRole("menuitem", { name: /edit/i })).toBeFocused()

    await page.keyboard.press("ArrowDown")
    await expect(page.getByRole("menuitem", { name: "Duplicate" })).toBeFocused()

    await page.keyboard.press("Escape")
    await expect(menu).not.toBeVisible()
    await expect(trigger).toBeFocused()
  })

  test("tabs switch with arrow keys and swap the panel", async ({ page }) => {
    const guidance = page.getByRole("tab", { name: "Guidance" })
    const vacant = page.getByRole("tab", { name: "Vacant" })

    await guidance.click()
    await expect(guidance).toHaveAttribute("aria-selected", "true")
    await expect(page.getByText(/hover an owner/i)).toBeVisible()

    await guidance.press("ArrowRight")
    await expect(vacant).toHaveAttribute("aria-selected", "true")
    await expect(vacant).toBeFocused()
    await expect(page.getByText("No activity yet")).toBeVisible()

    await vacant.press("ArrowLeft")
    await expect(guidance).toHaveAttribute("aria-selected", "true")
    await expect(page.getByText(/hover an owner/i)).toBeVisible()
  })

  test("alert dialog cancel closes from the keyboard", async ({ page }) => {
    await page.getByRole("button", { name: "Delete workspace" }).click()

    const alert = page.getByRole("alertdialog")
    await expect(alert).toBeVisible()
    await expect(alert.getByRole("heading", { name: /delete this workspace/i })).toBeVisible()

    await alert.getByRole("button", { name: "Cancel" }).press("Enter")
    await expect(alert).not.toBeVisible()
  })

  test("sidebar toggles with ctrl+b", async ({ page }) => {
    const sidebar = page.locator('[data-slot="sidebar"]')
    await expect(sidebar).toHaveAttribute("data-state", "expanded")

    await page.keyboard.press("Control+b")
    await expect(sidebar).toHaveAttribute("data-state", "collapsed")

    await page.keyboard.press("Control+b")
    await expect(sidebar).toHaveAttribute("data-state", "expanded")
  })
})
