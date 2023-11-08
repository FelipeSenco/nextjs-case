import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   const customer1 = await prisma.customer.create({
  //     data: {
  //       name: "John Doe",
  //       email: "john.doe@example.com",
  //       // add other fields as necessary
  //     },
  //   });
  //   const customer2 = await prisma.customer.create({
  //     data: {
  //       name: "Jane Doe",
  //       email: "jane.doe@example.com",
  //       // add other fields as necessary
  //     },
  //   });
  //   const customer3 = await prisma.customer.create({
  //     data: {
  //       name: "Jonas Tester",
  //       email: "jonas.tester@example.com",
  //       // add other fields as necessary
  //     },
  //   });

  console
    .log
    // `Created customers: ${customer1.name} ${customer2.name} ${customer3.name}`
    ();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
