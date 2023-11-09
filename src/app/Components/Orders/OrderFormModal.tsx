import { useCustomersQuery } from "@/hooks/CustomerQueries";
import {
  useCreateOrderMutation,
  useEditOrderMutation,
} from "@/hooks/OrdersQueries";
import { Order } from "@prisma/client";
import { FC, FormEvent, SetStateAction, useState } from "react";
import ReactModal from "react-modal";
import { useQueryClient } from "react-query";

type OrderFormModalProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  editOrder?: Order;
};

const OrderFormModal: FC<OrderFormModalProps> = ({
  open,
  setOpen,
  editOrder,
}) => {
  //check if customers are loaded, load if required
  const queryClient = useQueryClient();
  const customerDataLoaded = !!queryClient.getQueryData(["customers"]);
  const { customers } = useCustomersQuery(!customerDataLoaded);

  //get the mutation the create order
  const {
    mutateAsync: createOrderMutation,
    isLoading: isCreateLoading,
    isError: isCreateError,
  } = useCreateOrderMutation();

  //get the mutation to edit order
  const {
    mutateAsync: editOrderMutation,
    isLoading: isEditLoading,
    isError: isEditError,
  } = useEditOrderMutation();

  const [product, setProduct] = useState(editOrder?.product || "");
  const [quantity, setQuantity] = useState(editOrder?.quantity || 0);
  const [customerId, setCustomerId] = useState(editOrder?.customerId || 0);

  const onCreate = async () => {
    await createOrderMutation({ product, quantity, customerId });
    !isCreateError && setOpen(false);
  };

  const onEdit = async () => {
    await editOrderMutation({
      product,
      quantity,
      customerId,
      id: editOrder?.id as number,
    });
    !isEditError && setOpen(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    editOrder?.id ? await onEdit() : await onCreate();
  };

  return (
    <ReactModal
      isOpen={open}
      style={{
        overlay: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "50",
        },
        content: {
          position: "relative",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          outline: "none",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          background: "#f2f2f2",
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          width: "30%",
          height: "40%",
        },
      }}
    >
      <form
        className="relative p-8 w-full max-w-md m-auto flex-col flex items-center justify-center rounded"
        onSubmit={e => onSubmit(e)}
      >
        <div className="flex flex-col items-start">
          <div className="mb-6">
            <label htmlFor="product" className={labelStyle}>
              Product
            </label>
            <input
              maxLength={50}
              type="text"
              id="product"
              value={product}
              required
              onChange={e => setProduct(e.target.value)}
              className={inputStyle}
              data-testid="product-input"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="quantity" className={labelStyle}>
              Quantity
            </label>
            <input
              type="number"
              min={1}
              max={50}
              id="quantity"
              value={quantity}
              required
              onChange={e => setQuantity(parseInt(e.target.value))}
              className={inputStyle}
              data-testid="quantity-input"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="customerId" className={labelStyle}>
              Customer
            </label>
            <select
              id="customerId"
              value={customerId}
              onChange={e => setCustomerId(parseInt(e.target.value))}
              className={inputStyle}
              required
              data-testid="customer-select"
            >
              <option value="">Select a customer</option>
              {customers?.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between w-2/3 mt-3">
          <button
            type="submit"
            onClick={() => setOpen(false)}
            className="rounded-md border border-transparent bg-red-500 hover:bg-red-400 py-2 px-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreateLoading || isEditLoading}
            className="rounded-md border border-transparent bg-blue-500 hover:bg-blue-400 py-2 px-4"
          >
            Submit
          </button>
        </div>
      </form>
      {(isEditLoading || isCreateLoading) && <p>Please wait...</p>}
      {(isCreateError || isEditError) && (
        <div className="flex justify-center items-center">
          <p className="text-red-500">
            There was an error creating/editing the order. Please try again...
          </p>
        </div>
      )}
    </ReactModal>
  );
};

const labelStyle = "block text-sm font-medium text-gray-700";
const inputStyle =
  "rounded-md border border-gray-300 bg-white px-1 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50";

export default OrderFormModal;
