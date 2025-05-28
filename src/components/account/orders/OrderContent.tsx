"use client";

import { useState } from "react";
import { UserOrder } from "@/types/Order";
import OrderCard from "./OrderCard";
import EmptyState from "./EmptyState";
import OrderTabs from "./OrderTabs";

interface OrderContentProps {
  ordersByStatus: Record<string, UserOrder[]>;
  statusLabels: Record<string, string>;
}

export default function OrderContent({ ordersByStatus, statusLabels }: OrderContentProps) {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(statusLabels)[0]);

  if (Object.values(ordersByStatus).flat().length === 0) {
    return <EmptyState />;
  }

  const activeOrders = ordersByStatus[activeTab] || [];

  return (
    <div className="space-y-6">
      <OrderTabs ordersByStatus={ordersByStatus} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{statusLabels[activeTab]}</h2>
        <span className="text-sm text-gray-500">{activeOrders.length} سفارش</span>
      </div>
      <div>
        {activeOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
