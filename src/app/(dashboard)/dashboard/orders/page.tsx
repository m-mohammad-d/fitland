"use client";

import { useQuery } from "@apollo/client";
import { FiAlertCircle } from "react-icons/fi";
import DotSpinner from "@/components/ui/DotSpinner";
import { GET_ALL_ORDERS } from "@/graphql/queries/orderQueries";
import { ApoloGetAllOrdersResponse } from "@/types/Order";
import OrdersTable from "@/components/dashboard/OrdersTable";

export default function ManageOrders() {
  const { data, loading, error } = useQuery<ApoloGetAllOrdersResponse>(GET_ALL_ORDERS);

  if (loading) return <DotSpinner />;
  if (error)
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <FiAlertCircle className="h-12 w-12 text-red-500" />
        <p className="text-lg text-neutral-700">خطا در دریافت اطلاعات</p>
      </div>
    );

  return (
    <div className="p-4 md:p-6">
      <OrdersTable orders={data?.getAllOrders || []} />
    </div>
  );
}
