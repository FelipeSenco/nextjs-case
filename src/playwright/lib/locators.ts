import { Page } from "@playwright/test";

export const getLocators = (page: Page) => {
  return {
    homeLink: page.getByRole("link", { name: "Home" }),
    customersLink: page.getByRole("link", { name: "Customers" }),
    ordersLink: page.getByRole("link", { name: "Orders" }),
    createOrderButton: page.getByRole("button", { name: "Create Order" }),
    productInput: page.getByLabel("Product"),
    quantityInput: page.getByLabel("Quantity"),
    customerSelect: page.getByLabel("Customer"),
    orderSubmit: page.getByRole("button", { name: "Submit" }),
    cancelButton: page.getByRole("button", { name: "Cancel" }),
    lastRow: page.getByRole("row").last(),
    editOrderButton: page.getByRole("button", { name: "Edit" }),
    deleteOrderButton: page.getByRole("button", { name: "Delete" }),
    deleteConfirmButton: page.getByRole("button", { name: "Confirm" }),
  };
};

export const urls = {
  homePage: `${process.env.BASE_URL}/`,
  costumersPage: `${process.env.BASE_URL}/view/customers`,
  ordersPage: `${process.env.BASE_URL}/view/orders`,
};
