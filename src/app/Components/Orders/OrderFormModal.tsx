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
  editOrder: Order | null;
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
          border: "1px solid rgb(146 247 173)",
          borderRadius: "4px",
          background: "rgb(222 255 238)",
          top: "auto",
          left: "auto",
          right: "auto",
          bottom: "auto",
          width: "500px",
          height: "475px",
        },
      }}
    >
      <form
        className="relative p-8 w-full max-w-md m-auto flex-col flex items-center justify-center rounded shadow-lg bg-white"
        onSubmit={e => onSubmit(e)}
      >
        <div className="w-full">
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
              className="block appearance-none w-full border border-gray-300 rounded py-2 px-3 bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="flex justify-between w-full mt-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreateLoading || isEditLoading}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
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

const labelStyle = "block text-gray-700 text-sm font-semibold mb-2";
const inputStyle =
  "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

export default OrderFormModal;
