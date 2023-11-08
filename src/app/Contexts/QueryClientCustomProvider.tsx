"use client";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
type QueryClientCustomProviderProps = {
  children: ReactNode;
};

export const QueryClientCustomProvider: FC<QueryClientCustomProviderProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientCustomProvider;
