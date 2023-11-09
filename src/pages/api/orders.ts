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
    case "GET":
      try {
        const orders = await prisma.order.findMany({
          include: {
            Customer: true,
          },
        });
        res.status(200).json({ orders });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders." });
      }
      break;

    case "POST":
      try {
        const { product, quantity, customerId } = req.body;

        const productError = validateProduct(product);
        if (productError) return res.status(400).json({ error: productError });

        const quantityError = validateQuantity(quantity);
        if (quantityError)
          return res.status(400).json({ error: quantityError });

        const customerError = await validateCustomerId(customerId);
        if (customerError)
          return res.status(400).json({ error: customerError });

        const order = await prisma.order.create({
          data: { product, quantity, customerId },
        });
        res.status(201).json({ order });
      } catch (error) {
        res.status(500).json({ error: "Failed to create order." });
        console.log(error);
      }
      break;

    case "PUT":
      try {
        const { id, product, quantity, customerId } = req.body;

        const orderError = validateOrderId(id);
        if (orderError) return res.status(400).json({ error: orderError });

        const productError = validateProduct(product);
        if (productError) return res.status(400).json({ error: productError });

        const quantityError = validateQuantity(quantity);
        if (quantityError)
          return res.status(400).json({ error: quantityError });

        const customerError = await validateCustomerId(customerId);
        if (customerError)
          return res.status(400).json({ error: customerError });

        const order = await prisma.order.update({
          where: { id },
          data: { product, quantity, customerId },
        });
        res.status(200).json({ order });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update order." });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;

        const orderError = validateOrderId(Number(id));
        if (orderError) return res.status(400).json({ error: orderError });

        await prisma.order.delete({
          where: { id: Number(id) },
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
async function validateCustomerId(customerId: number): Promise<string | null> {
  if (!customerId || typeof customerId !== "number") {
    return "Invalid or missing customerId.";
  }

  const customerExists = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  return customerExists ? null : "Customer not found.";
}

function validateOrderId(id: number): string | null {
  if (!id || typeof id !== "number") {
    return "Invalid or missing order id.";
  }
  return null;
}

function validateProduct(product: string): string | null {
  console.log(product.length);
  if (!product || typeof product !== "string" || product.length > 50) {
    return "Invalid or too long product name.";
  }
  return null;
}

function validateQuantity(quantity: number): string | null {
  if (typeof quantity !== "number" || quantity < 1 || quantity > 50) {
    return "Invalid quantity. Must be a number between 1 and 50.";
  }
  return null;
}
