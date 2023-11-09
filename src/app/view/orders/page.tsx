"use client";

import { useState } from "react";
import ReactModal from "react-modal";
import { useOrdersQuery } from "@/hooks/OrdersQueries";
import OrderFormModal from "@/app/Components/Orders/OrderFormModal";
import OrderView from "@/app/Components/Orders/OrderView";
import { Order } from "@prisma/client";

ReactModal.setAppElement("#view-layout");

const Orders = () => {
  const { orders, isLoading, isError } = useOrdersQuery(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [editOrder, setEditOrder] = useState<Order>();

  const onEditClick = (order: Order) => {
    setEditOrder(order);
    setShowOrderForm(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <button
        onClick={() => {
          setShowOrderForm(true);
        }}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Create Order
      </button>
      <OrderView
        orders={orders}
        isError={isError}
        isLoading={isLoading}
        onEdit={onEditClick}
        onDelete={() => {}}
      />
      {showOrderForm && (
        <OrderFormModal
          open={showOrderForm}
          setOpen={setShowOrderForm}
          editOrder={editOrder}
        />
      )}
    </div>
  );
};

export default Orders;
