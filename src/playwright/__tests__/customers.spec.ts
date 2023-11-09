import { getLocators, urls } from "../lib/locators";
import { test, expect } from "@playwright/test";

test.describe("Customers", () => {
  test("Should locad the customers in the table", async ({ page }) => {
    const locators = getLocators(page);
    await page.goto(urls.costumersPage);

    await locators.lastRow.getByText("3").waitFor();
    const count = await page.getByRole("row").count();
    expect(count).toBeGreaterThan(1);
  });
});
