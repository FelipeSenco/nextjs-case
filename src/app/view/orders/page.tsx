"use client";
import { useState } from "react";
import ReactModal from "react-modal";
import { useDeleteOrderMutation, useOrdersQuery } from "@/hooks/OrdersQueries";
import OrderFormModal from "@/app/Components/Orders/OrderFormModal";
import OrderView from "@/app/Components/Orders/OrderView";
import { Order } from "@prisma/client";
import DeleteModal from "@/app/Components/DeleteConfirmModal";

ReactModal.setAppElement("#view-layout");

const Orders = () => {
  const { orders, isLoading, isError } = useOrdersQuery(true);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editOrder, setEditOrder] = useState<Order>();
  const [deleteId, setDeleteId] = useState<number>(0);

  //get the mutation for delete
  const {
    mutateAsync: deleteOrder,
    isLoading: isDeleteLoading,
    isError: isDeleteError,
  } = useDeleteOrderMutation();

  const onEditClick = (order: Order) => {
    setEditOrder(order);
    setShowOrderForm(true);
  };

  const onDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const onDeleteconfirm = async () => {
    await deleteOrder(deleteId);
    !isDeleteError && setShowDeleteModal(false);
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
        onDelete={onDeleteClick}
      />
      {showOrderForm && (
        <OrderFormModal
          open={showOrderForm}
          setOpen={setShowOrderForm}
          editOrder={editOrder}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          onConfirm={onDeleteconfirm}
          isLoading={isDeleteLoading}
          isError={isDeleteError}
        />
      )}
    </div>
  );
};

export default Orders;
