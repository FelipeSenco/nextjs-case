import { ExtendedOrder } from "@/app/Components/Orders/OrderView";
import { Customer } from "@prisma/client";

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

export const ordersMock: ExtendedOrder[] = [
  {
    id: 1,
    product: "MockProduct1",
    quantity: 10,
    customerId: customersMock[0].id,
    dateCreated: new Date(),
    Customer: customersMock[0],
  },
  {
    id: 2,
    product: "MockProduct2",
    quantity: 11,
    customerId: customersMock[1].id,
    dateCreated: new Date(),
    Customer: customersMock[1],
  },
  {
    id: 3,
    product: "MockProduct3",
    quantity: 12,
    customerId: customersMock[2].id,
    dateCreated: new Date(),
    Customer: customersMock[2],
  },
];
