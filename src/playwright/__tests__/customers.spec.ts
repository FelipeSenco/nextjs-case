import { test, expect } from "@playwright/test";
import { getLocators, urls } from "../lib/locators";

test.describe("Customers", () => {
  test("Should locad the customers in the table", async ({ page }) => {
    const locators = getLocators(page);
    await page.goto(urls.costumersPage);

    await locators.lastRow.waitFor();
    const count = await page.getByRole("row").count();
    expect(count).toBeGreaterThan(1);
  });
});
