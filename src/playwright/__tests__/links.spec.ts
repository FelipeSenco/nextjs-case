import { getLocators, urls } from "../lib/locators";
import { test, expect } from "@playwright/test";

test.describe("Links", () => {
  test("Should navigate to the correct pages", async ({ page }) => {
    const locators = getLocators(page);
    await page.goto(urls.homePage);
    expect(page.url()).toBe(urls.homePage);

    //Customers link
    await locators.customersLink.click();
    await page.waitForURL(urls.costumersPage);
    expect(page.url()).toBe(urls.costumersPage);

    //Orders link
    await locators.ordersLink.click();
    await page.waitForURL(urls.ordersPage);
    expect(page.url()).toBe(urls.ordersPage);

    //Home link
    await locators.homeLink.click();
    await page.waitForURL(urls.homePage);
    expect(page.url()).toBe(urls.homePage);
  });
});
