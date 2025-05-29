"use client";

import { useState } from "react";
import { UserOrder } from "@/types/Order";
import OrderCard from "./OrderCard";
import OrderTabs from "./OrderTabs";
import EmptyState from "@/components/ui/EmptyState";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
interface OrderContentProps {
  ordersByStatus: Record<string, UserOrder[]>;
  statusLabels: Record<string, string>;
}

export default function OrderContent({ ordersByStatus, statusLabels }: OrderContentProps) {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(statusLabels)[0]);

  if (Object.values(ordersByStatus).flat().length === 0) {
    return (
      <EmptyState
        title="هیچ سفارشی ثبت نشده است"
        description="شما هنوز سفارشی ثبت نکرده‌اید. با استفاده از دکمه زیر سفارش جدید ثبت کنید."
        icon={<AiOutlineShoppingCart className="text-primary" size={40} />}
        action={
          <Link href="/products" className="text bg-primary flex items-center justify-center rounded-md px-4 py-2 text-white">
            سفارش جدید
          </Link>
        }
      />
    );
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
        {activeOrders.length === 0 ? (
          <p className="text-center text-gray-500">هیچ سفارشی با این وضعیت وجود ندارد</p>
        ) : (
          activeOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
