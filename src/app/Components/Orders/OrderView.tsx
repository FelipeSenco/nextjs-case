import { Order } from "@prisma/client";
import { FC } from "react";
import LoadingSpinner from "../LoadingSpinner";

export type ExtendedOrder = Order & {
  // Updated type to include customer info
  Customer: {
    name: string;
  };
};

type OrderViewProps = {
  isLoading: boolean;
  isError: boolean;
  orders: ExtendedOrder[];
};

const OrderView: FC<OrderViewProps> = ({ isLoading, isError, orders = [] }) => {
  return (
    <div className="container mx-auto mt-10">
      {!isError && !isLoading && orders?.length === 0 && (
        <p className="text-gray-600 mt-4">There are no orders yet...</p>
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
                        {new Date(order.dateCreated).toLocaleDateString()}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isLoading && <LoadingSpinner />}
              {isError && (
                <div className="flex justify-center items-center">
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
