import OrderView, { ExtendedOrder } from "@/app/Components/Orders/OrderView";
import { fireEvent, render, screen, act } from "@testing-library/react";
import { ordersMock } from "./mocks/mocks";

const mockEdit = jest.fn();
const mockDelete = jest.fn();

describe("OrderView component", () => {
  test("Show loading spinner if isLoading is true", () => {
    render(
      <OrderView
        isLoading={true}
        isError={false}
        orders={[]}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const loading = screen.getByTestId("loading-spinner");

    expect(loading).toBeDefined();
  });

  test("Do NOT show loading spinner if isLoading is false", () => {
    render(
      <OrderView
        isLoading={false}
        isError={false}
        orders={[]}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const loading = document.querySelector(`[data-testid="loading-spinner"]`);

    expect(loading).toBeNull();
  });

  test("Show error message if isError is true", () => {
    render(
      <OrderView
        isLoading={false}
        isError={true}
        orders={[]}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const error = screen.getByTestId("order-view-error");

    expect(error).toBeDefined();
  });

  test("Do NOT show error message if isError is false", () => {
    render(
      <OrderView
        isLoading={false}
        isError={false}
        orders={[]}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const error = document.querySelector(`[data-testid="order-view-error"]`);

    expect(error).toBeNull();
  });

  test("Show order data in the table when available", () => {
    render(
      <OrderView
        isLoading={false}
        isError={false}
        orders={ordersMock}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const product1 = screen.getByText(ordersMock[0].product);
    const customer1 = screen.getByText(ordersMock[0].Customer.name);
    const quantity1 = screen.getByText(ordersMock[0].quantity);
    const product2 = screen.getByText(ordersMock[1].product);
    const customer2 = screen.getByText(ordersMock[1].Customer.name);
    const quantity2 = screen.getByText(ordersMock[1].quantity);
    const product3 = screen.getByText(ordersMock[2].product);
    const customer3 = screen.getByText(ordersMock[2].Customer.name);
    const quantity3 = screen.getByText(ordersMock[2].quantity);

    expect(product1).toBeDefined();
    expect(customer1).toBeDefined();
    expect(quantity1).toBeDefined();
    expect(product2).toBeDefined();
    expect(customer2).toBeDefined();
    expect(quantity2).toBeDefined();
    expect(product3).toBeDefined();
    expect(customer3).toBeDefined();
    expect(quantity3).toBeDefined();
  });

  test("Call onEdit with the correct order as argument, when the edit button is clicked", () => {
    render(
      <OrderView
        isLoading={false}
        isError={false}
        orders={ordersMock}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const editButton = screen.getByTestId(`order-edit-${ordersMock[1].id}`);

    act(() => {
      fireEvent.click(editButton);
    });
    expect(mockEdit).toHaveBeenCalledWith(ordersMock[1]);
  });

  test("Call onDelete with the correct order id as argument, when the delete button is clicked", async () => {
    render(
      <OrderView
        isLoading={false}
        isError={false}
        orders={ordersMock}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />
    );

    const deleteButton = screen.getByTestId(`order-delete-${ordersMock[0].id}`);
    act(() => {
      fireEvent.click(deleteButton);
    });

    expect(mockDelete).toHaveBeenCalled();
  });
});
