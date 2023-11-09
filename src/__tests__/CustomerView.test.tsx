import CustomerView from "@/app/Components/Customers/CustomerView";
import { Customer } from "@prisma/client";
import { render, screen } from "@testing-library/react";

export const customersMock: Customer[] = [
  {
    id: 1,
    name: "Mock1",
    email: "mock1@test.com",
  },
  {
    id: 2,
    name: "Mock2",
    email: "mock2@test.com",
  },
  {
    id: 3,
    name: "Mock3",
    email: "mock3@test.com",
  },
];

describe("CustomerView component", () => {
  test("Show loading spinner if isLoading is true", () => {
    render(<CustomerView isLoading={true} isError={false} customers={[]} />);

    const loading = screen.getByTestId("loading-spinner");

    expect(loading).toBeDefined();
  });

  test("Show error message if isError is true", () => {
    render(<CustomerView isLoading={false} isError={true} customers={[]} />);

    const error = screen.getByTestId("customer-view-error");

    expect(error).toBeDefined();
  });

  test("Show customer data in the table when available", () => {
    render(
      <CustomerView
        isLoading={false}
        isError={false}
        customers={customersMock}
      />
    );

    const name1 = screen.getByText(customersMock[0].name);
    const email1 = screen.getByText(customersMock[0].email);
    const name2 = screen.getByText(customersMock[1].name);
    const email2 = screen.getByText(customersMock[1].email);
    const name3 = screen.getByText(customersMock[2].name);
    const email3 = screen.getByText(customersMock[2].email);

    expect(name1).toBeDefined();
    expect(email1).toBeDefined();
    expect(name2).toBeDefined();
    expect(email2).toBeDefined();
    expect(name3).toBeDefined();
    expect(email3).toBeDefined();
  });
});
