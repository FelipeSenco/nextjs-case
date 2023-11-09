import { PrismaClient, Order } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Data =
  | { message: string }
  | { order?: Order }
  | { orders?: Order[] }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    //GET
    case "GET":
      try {
        const orders = await prisma.order.findMany({
          include: {
            Customer: true, // This includes the customer data
          },
        });
        res.status(200).json({ orders });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders." });
      }
      break;

    //POST
    case "POST":
      try {
        const { product, quantity, customerId } = req.body;

        // Check if customerId is provided and is a number
        if (!customerId || typeof customerId !== "number") {
          return res
            .status(400)
            .json({ error: "Invalid or missing customerId." });
        }

        // Check if the customerId corresponds to an existing Customer
        const customerExists = await prisma.customer.findUnique({
          where: { id: customerId },
        });

        if (!customerExists) {
          return res.status(404).json({ error: "Customer not found." });
        }
        const order = await prisma.order.create({
          data: { product, quantity, customerId },
        });
        res.status(201).json({ order });
      } catch (error) {
        res.status(500).json({ error: "Failed to create order." });
        console.log(error);
      }
      break;

    //PUT
    case "PUT":
      try {
        const { id, customerId } = req.body;

        // Check if customerId is provided and is a number
        if (!customerId || typeof customerId !== "number") {
          return res
            .status(400)
            .json({ error: "Invalid or missing customerId." });
        }

        // Check if order id is provided and is a number
        if (!id || typeof id !== "number") {
          return res
            .status(400)
            .json({ error: "Invalid or missing order id." });
        }

        // Check if the customerId corresponds to an existing Customer
        const customerExists = await prisma.customer.findUnique({
          where: { id: customerId },
        });
        if (!customerExists) {
          return res.status(404).json({ error: "Customer not found." });
        }

        const order = await prisma.order.update({
          where: { id },
          data: req.body,
        });
        res.status(200).json({ order });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update order." });
      }
      break;

    //DELETE
    case "DELETE":
      try {
        const id = Number(req.query.id);

        // Check if customerId is provided and is a number
        if (!id || typeof id !== "number") {
          return res
            .status(400)
            .json({ error: "Invalid or missing order id." });
        }

        await prisma.order.delete({
          where: { id },
        });
        res.status(200).json({ message: "Order deleted successfully." });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete order." });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
