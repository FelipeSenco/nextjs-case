// tests/api/orders.test.ts
import { test, expect, APIRequestContext } from "@playwright/test";
import { Order } from "@prisma/client";

test.describe("API Endpoint /api/orders", () => {
  test("GET should return a list of orders", async ({ request }) => {
    const newOrder = {
      product: "Test Product " + new Date().getTime(),
      quantity: 1,
      customerId: 1,
    };
    //Create an order to make sure we have a record
    const createResponse = await createOrder(request, newOrder);

    //TEST
    const response = await getOrders(request);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.orders.length).toBeGreaterThan(0);

    //clean up
    const createResponseBody = await createResponse.json();
    const createdOrder = createResponseBody.order;

    await deleteOrder(request, createdOrder?.id as number);
  });

  test("POST should create a new order", async ({ request }) => {
    const newOrder = {
      product: "Test Product " + new Date().getTime(),
      quantity: 1,
      customerId: 1,
    };
    //Create an order
    const createReponse = await createOrder(request, newOrder);

    //TEST
    expect(createReponse.status()).toBe(201);
    const createResponseBody = await createReponse.json();

    const createdOrder = createResponseBody.order;
    expect(createdOrder).toBeDefined();

    //clean up
    await deleteOrder(request, createdOrder?.id as number);
  });

  test("PUT should update an existing order", async ({ request }) => {
    const newOrder = {
      product: "Test Product " + new Date().getTime(),
      quantity: 1,
      customerId: 1,
    };
    //Create an order to make sure we have a record
    const createResponse = await createOrder(request, newOrder);

    const createResponseBody = await createResponse.json();
    const createdOrder = createResponseBody.order;

    //TEST
    const updateData = {
      product: "Test Product edited " + new Date().getTime(),
      quantity: 1,
      customerId: 1,
      id: createdOrder?.id,
    };

    const editResponse = await request.put(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`,
      {
        data: updateData,
      }
    );
    expect(editResponse.status()).toBe(200);

    const newOrdersResponse = await getOrders(request);

    const body = await newOrdersResponse.json();
    const editedOrder = (body.orders as Order[]).find(
      o => o.product === updateData.product
    );
    expect(editedOrder).toBeDefined();

    //clean up
    await deleteOrder(request, editedOrder?.id as number);
  });

  test("DELETE should remove an order", async ({ request }) => {
    const newOrder = {
      product: "Test Product " + new Date().getTime(),
      quantity: 1,
      customerId: 1,
    };

    //Create an order to make sure we have a record
    const createResponse = await createOrder(request, newOrder);
    const createResponseBody = await createResponse.json();
    const createdOrder = createResponseBody.order;

    //TEST
    const response = await deleteOrder(request, createdOrder?.id as number);
    expect(response.status()).toBe(200);

    const newOrdersResponse = await getOrders(request);
    const body = await newOrdersResponse.json();
    const deletedOrder = (body.orders as Order[]).find(
      o => o.product === newOrder.product
    );
    expect(deletedOrder).toBeUndefined();
  });

  test("Should return status code 405 for undefined methods", async ({
    request,
  }) => {
    const response = await request.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/orders`
    );
    expect(response.status()).toBe(405);
  });

  test("Should return status code 400 for invalid product string", async ({
    request,
  }) => {
    const newOrder = {
      product:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel condimentum dolor, et lacinia justo. Curabitur massa arcu, dignissim tempor rutrum ac, ornare ut dui. Proin venenatis libero erat, eget porttitor diam bibendum ac. Phasellus malesuada quis nunc eget vestibulum. Cras est lacus, aliquam eu pretium nec, tempus nec neque. Ut id augue rhoncus, tristique nulla eu, gravida arcu. Proin ultrices magna quis justo aliquet, in volutpat nunc gravida.",
      quantity: 1,
      customerId: 1,
    };
    //Create an order
    const createReponse = await createOrder(request, newOrder);

    //TEST
    expect(createReponse.status()).toBe(400);
  });

  test("Should return status code 400 for invalid quantity", async ({
    request,
  }) => {
    const newOrder = {
      product: "Test Product",
      quantity: 66,
      customerId: 1,
    };
    //Create an order
    const createReponse = await createOrder(request, newOrder);

    //TEST
    expect(createReponse.status()).toBe(400);
  });

  test("Should return status code 400 for invalid customerId", async ({
    request,
  }) => {
    const newOrder = {
      product: "Test Product",
      quantity: 3,
      customerId: 121213242142123,
    };
    //Create an order
    const createReponse = await createOrder(request, newOrder);

    //TEST
    expect(createReponse.status()).toBe(400);
  });
});

const createOrder = async (request: APIRequestContext, order: AddOrderData) =>
  await request.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    data: order,
  });

const deleteOrder = async (request: APIRequestContext, id: number) =>
  await request.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders?id=${id}`);

const getOrders = async (request: APIRequestContext) =>
  await request.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
