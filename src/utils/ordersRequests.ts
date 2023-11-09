import { Order } from "@prisma/client";
import axios from "axios";

export async function getOrders(): Promise<Order[]> {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
  return response.data.orders;
}

export async function createOrder(data: AddOrderData): Promise<void> {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, data);
}

export async function editOrder(data: EditOrderData): Promise<void> {
  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders`, data);
}

export async function deleteOrder(id: number): Promise<void> {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/orders?id=${id}`);
}
