import { PrismaClient, Customer } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type ResponseData = {
  customers?: Customer[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const customers = await prisma.customer.findMany({
        include: { orders: true },
      });
      res.status(200).json({ customers });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch customers." });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
