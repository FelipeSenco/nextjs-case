import { Customer } from "@prisma/client";
import { FC } from "react";
import LoadingSpinner from "../LoadingSpinner";

type CustomerViewProps = {
  customers: Customer[];
  isLoading: boolean;
  isError: boolean;
};
const CustomerView: FC<CustomerViewProps> = ({
  customers = [],
  isError,
  isLoading,
}) => {
  return (
    <div className="container mx-auto mt-10">
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
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers?.map(customer => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {customer.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isLoading && <LoadingSpinner />}
              {isError && (
                <div className="flex justify-center items-center">
                  <p className="text-red-500">
                    There was an error fetching customer data. Please reload the
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

export default CustomerView;
