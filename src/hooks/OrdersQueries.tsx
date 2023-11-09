"use client";

import { ExtendedOrder } from "@/app/Components/Orders/OrderView";
import { createOrder, getOrders } from "@/utils/ordersRequests";
import { Order } from "@prisma/client";
import { useMutation, useQuery } from "react-query";

export const useOrdersQuery = (enabled = false) => {
  const { data, isError, isLoading, refetch } = useQuery(
    ["orders"],
    getOrders,
    {
      enabled,
      onError: (error: Error) => console.log(error),
    }
  );
  const orders = data as ExtendedOrder[];
  return { orders, isError, isLoading, refetch };
};

export const useCreateOrderMutation = () => {
  const { refetch } = useOrdersQuery();

  return useMutation(createOrder, {
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: () => {
      refetch();
    },
  });
};
