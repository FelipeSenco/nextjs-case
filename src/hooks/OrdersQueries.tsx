"use client";

import { ExtendedOrder } from "@/app/Components/Orders/OrderView";
import {
  createOrder,
  deleteOrder,
  editOrder,
  getOrders,
} from "@/utils/ordersRequests";
import { Customer } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "react-query";

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

export const useEditOrderMutation = () => {
  const queryClient = useQueryClient();
  const originalState = queryClient.getQueryData(["orders"]) as ExtendedOrder[];
  const customers = queryClient.getQueryData(["customers"]) as Customer[];

  return useMutation(editOrder, {
    onMutate: editedOrder => {
      const optimisticState = originalState.map(order => {
        //if the id match, update the fields for the order
        if (order.id === editedOrder.id) {
          const customer = customers.find(c => c.id === editedOrder.customerId);
          order = {
            ...order,
            Customer: customer as Customer,
            customerId: editedOrder.customerId,
            quantity: editedOrder.quantity,
            product: editedOrder.product,
          };
        }
        return order;
      });
      //set the query data to the optimistic state
      queryClient.setQueryData(["orders"], optimisticState);
    },
    onError: (error: Error) => {
      console.log(error);
      //revert the query data to original, if the api fails
      queryClient.setQueryData(["orders"], originalState);
    },
  });
};

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();
  const originalState = queryClient.getQueryData(["orders"]) as ExtendedOrder[];

  return useMutation(deleteOrder, {
    onMutate: id => {
      //set the query data to the optimistic state
      const optimisticState = originalState.filter(o => o.id !== id);
      queryClient.setQueryData(["orders"], optimisticState);
    },
    onError: (error: Error) => {
      console.log(error);
      //revert the query data to original, if the api fails
      queryClient.setQueryData(["orders"], originalState);
    },
  });
};
