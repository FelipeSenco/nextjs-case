import { test, expect } from "@playwright/test";

test.describe("API Endpoint /api/customers", () => {
  test("Should return a list of customers on GET", async ({ request }) => {
    const response = await request.get(
      `${process.env.NEXT_PUBLIC_API_URL}/customers`
    );
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.customers.length).toBeGreaterThan(0);
  });
});
