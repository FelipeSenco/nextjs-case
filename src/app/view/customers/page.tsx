"use client";
import CustomerView from "@/app/Components/Customers/CustomerView";
import { useCustomersQuery } from "@/hooks/CustomerQueries";

const Customers = () => {
  const { customers, isLoading, isError } = useCustomersQuery(true);

  return (
    <CustomerView
      customers={customers}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default Customers;
