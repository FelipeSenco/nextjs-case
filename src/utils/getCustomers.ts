import { Customer } from "@prisma/client";
import axios from "axios";

export async function getCustomers(): Promise<Customer[]> {
  const response = await axios.get(`${process.env.API_URL}/customers`);
  return response.data.customers;
}
