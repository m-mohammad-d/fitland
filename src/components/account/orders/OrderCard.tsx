import { UserOrder } from "@/types/Order";
import { formatJalaliDate } from "@/lib/Date";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiDollarSign, FiArrowLeft } from "react-icons/fi";

interface OrderCardProps {
  order: UserOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary-100">
      <div className="flex flex-col gap-3 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <FiClock className="text-primary-500 min-w-[20px]" />
          <span className="text-sm text-gray-600">{formatJalaliDate(order.createdAt)}</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
          <FiDollarSign className="text-green-500" />
          <span className="text-sm font-medium text-gray-700">{order.totalPrice.toLocaleString()} تومان</span>
        </div>

        <Link
          href={`/account/orders/${order.id}`}
          className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm transition-colors"
        >
          جزئیات سفارش
          <FiArrowLeft className="text-xs" />
        </Link>
      </div>

      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {order.items.map((item, index) => (
            <div
              key={`${order.id}-${index}`}
              className="group relative min-w-[120px] flex-none sm:min-w-0 sm:aspect-square overflow-hidden rounded-lg bg-gray-100"
            >
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                width={120}
                height={120}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="w-full truncate text-center text-xs text-white">{item.product.name}</p>
              </div>
            </div>
          ))}
        </div>
        {order.items.length > 6 && (
          <div className="mt-3 text-center text-sm text-gray-500">+ {order.items.length - 6} مورد دیگر</div>
        )}
      </div>
    </div>
  );
}
