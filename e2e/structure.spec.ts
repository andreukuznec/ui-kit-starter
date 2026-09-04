import { expect, test } from "@playwright/test"

test.describe("structure", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("heading", { name: /build with the relay/i })).toBeVisible()
  })

  test("breadcrumb nav matches the aria snapshot", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "breadcrumb" })).toMatchAriaSnapshot(`
      - navigation "breadcrumb":
        - list:
          - listitem:
            - link "Relay UI":
              - /url: "#showcase"
          - listitem:
            - link "Starter"
    `)
  })

  test("pagination nav matches the aria snapshot", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "pagination" })).toMatchAriaSnapshot(`
      - navigation "pagination":
        - list:
          - listitem:
            - link "Go to previous page":
              - /url: "#workstreams"
          - listitem:
            - link "1":
              - /url: "#workstreams"
          - listitem:
            - link "2":
              - /url: "#workstreams"
          - listitem:
            - link "Go to next page":
              - /url: "#workstreams"
    `)
  })
})
