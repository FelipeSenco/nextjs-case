"use client";

import { getCustomers } from "@/utils/getCustomers";
import { Customer } from "@prisma/client";
import { useQuery } from "react-query";

export const useCostumersQuery = (enabled = false) => {
  const { data, isError, isLoading, refetch } = useQuery(
    ["customers"],
    getCustomers,
    {
      enabled,
      initialData: [] as unknown[],
      onError: (error: Error) => console.log(error),
    }
  );
  const customers = data as Customer[];
  return { customers, isError, isLoading, refetch };
};
