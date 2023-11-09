import { Order } from "@prisma/client";
import { FC } from "react";
import LoadingSpinner from "../LoadingSpinner";

export type ExtendedOrder = Order & {
  Customer: {
    name: string;
  };
};

type OrderViewProps = {
  isLoading: boolean;
  isError: boolean;
  orders: ExtendedOrder[];
  onEdit: (order: Order) => void;
  onDelete: (orderId: number) => void;
};

const OrderView: FC<OrderViewProps> = ({
  isLoading,
  isError,
  orders = [],
  onEdit,
  onDelete,
}) => {
  return (
    <div className="container mx-auto mt-10">
      {!isError && !isLoading && orders?.length === 0 && (
        <div className="flex justify-center items-center p-1">
          <p className="text-lg font-semibold text-yellow-600 bg-yellow-100 border border-yellow-200 rounded-md shadow px-2">
            There are no orders yet...
          </p>
        </div>
      )}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.product}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.Customer?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.dateCreated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          data-testid={`order-edit-${order.id}`}
                          onClick={() => onEdit(order)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          data-testid={`order-delete-${order.id}`}
                          onClick={() => onDelete(order.id)}
                          className="text-red-600 hover:text-red-900 ml-4"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isLoading && <LoadingSpinner />}
              {isError && (
                <div
                  className="flex justify-center items-center"
                  data-testid="order-view-error"
                >
                  <p className="text-red-500">
                    There was an error fetching the orders. Please reload the
                    page...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
