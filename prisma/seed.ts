import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const customer1 = await prisma.customer.create({
      data: {
        name: "John Doe",
        email: "john.doe@example.com",
     
      },
    });
    const customer2 = await prisma.customer.create({
      data: {
        name: "Jane Doe",
        email: "jane.doe@example.com",
     
      },
    });
    const customer3 = await prisma.customer.create({
      data: {
        name: "Jonas Tester",
        email: "jonas.tester@example.com",
     
      },   
    });
      const customer4 = await prisma.customer.create({
        data: {
          name: "Dev Davito",
          email: "dev.davito@example.com",
       
        },   
      });
        const customer5 = await prisma.customer.create({
          data: {
            name: "Last Customer",
            email: "last.customer@example.com",
         
          },   
        });
   
 
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
