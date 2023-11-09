import { getLocators, urls } from "../lib/locators";
import { test, expect } from "@playwright/test";

test.describe("Orders", () => {
  test("Should be able to do all CRUD operations with orders", async ({
    page,
  }) => {
    const locators = getLocators(page);
    await page.goto(urls.ordersPage);

    //CREATE ORDER
    const currentTime = new Date().getTime();
    await locators.createOrderButton.click();
    await locators.productInput.fill("Test Product " + currentTime);
    await locators.quantityInput.fill("10");
    await locators.customerSelect.selectOption("1");
    await locators.orderSubmit.click();
    await locators.lastRow.waitFor();
    expect(locators.lastRow).toContainText("Test Product " + currentTime);
    expect(locators.lastRow).toContainText("10");

    //EDIT ORDER
    await locators.editOrderButton.last().click();
    await locators.productInput.fill("Test Product edited " + currentTime);
    await locators.quantityInput.fill("11");
    await locators.orderSubmit.click();
    await locators.lastRow.waitFor();
    expect(locators.lastRow).toContainText(
      "Test Product edited " + currentTime
    );
    expect(locators.lastRow).toContainText("11");

    //DELETE ORDER
    await locators.deleteOrderButton.last().click();
    await locators.deleteConfirmButton.click();
    await locators.lastRow.waitFor();
    expect(locators.lastRow).not.toContainText(
      "Test Product edited " + currentTime
    );
  });

  test("Should close the order form on cancel click", async ({ page }) => {
    const locators = getLocators(page);
    await page.goto(urls.ordersPage);

    await locators.createOrderButton.click();
    expect(locators.productInput).toBeVisible();
    await locators.cancelButton.click();
    expect(locators.productInput).toBeHidden();
  });

  test("Should close the delete modal on cancel click", async ({ page }) => {
    const locators = getLocators(page);
    await page.goto(urls.ordersPage);

    //create an order in case there isn't any, the delete button won't be available if not
    await locators.createOrderButton.click();
    await locators.productInput.fill("Test Product");
    await locators.quantityInput.fill("10");
    await locators.customerSelect.selectOption("1");
    await locators.orderSubmit.click();
    await locators.lastRow.waitFor();

    await locators.deleteOrderButton.last().click();
    expect(locators.deleteConfirmButton).toBeVisible();
    await locators.cancelButton.click();
    expect(locators.deleteConfirmButton).toBeHidden();
  });
});
