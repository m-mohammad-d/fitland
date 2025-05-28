"use client";

import { UserOrder } from "@/types/Order";

interface OrderTabsProps {
  ordersByStatus: Record<string, UserOrder[]>;
  activeTab: string;
  onTabChange: (status: string) => void;
}

const statusLabels = {
  PROCESSING: "در حال پردازش",
  SHIPPED: "در حال ارسال",
  DELIVERED: "تحویل داده شده",
  CANCELED: "لغو شده",
};

const statusColors = {
  PROCESSING: "bg-blue-100 text-blue-800",
  SHIPPED: "bg-yellow-100 text-yellow-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELED: "bg-red-100 text-red-800",
};

const statusIcons = {
  PROCESSING: "⏳",
  SHIPPED: "🚚",
  DELIVERED: "✅",
  CANCELED: "❌",
};

export default function OrderTabs({ ordersByStatus, activeTab, onTabChange }: OrderTabsProps) {
  return (
    <div className="mb-6 border-b border-gray-200">
      <nav className="-mb-px flex flex-wrap gap-2 sm:gap-8" aria-label="Tabs">
        {Object.entries(statusLabels).map(([status, label]) => (
          <button
            key={status}
            onClick={() => onTabChange(status)}
            className={`group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === status
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <span className="ml-2">{statusIcons[status as keyof typeof statusIcons]}</span>
            <span className="hidden sm:inline">{label}</span>
            {ordersByStatus[status]?.length > 0 && (
              <span
                className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  statusColors[status as keyof typeof statusColors]
                }`}
              >
                {ordersByStatus[status].length}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
} 