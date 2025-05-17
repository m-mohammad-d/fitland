import { GET_USER_ORDERS } from "@/graphql/queries/orderQueries";
import { formatJalaliDate } from "@/lib/Date";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetUserOrdersResponse } from "@/types/Order";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";
import { FiClock, FiDollarSign, FiArrowLeft } from "react-icons/fi";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "سفارش‌های من",
  description: "نمایش لیست سفارش‌هایی که تاکنون ثبت کرده‌اید.",
  openGraph: {
    title: "سفارش‌های من | FitLand",
    description: "مدیریت و مشاهده وضعیت سفارش‌های شما در فیت‌لند.",
  },
  twitter: {
    title: "سفارش‌های من",
    description: "سفارش‌های قبلی و در حال پردازش خود را بررسی کنید.",
  },
};
async function UserOrdersPage() {
  const res = await graphQLFetch<GetUserOrdersResponse>(process.env.NEXT_PUBLIC_BACKEND_URL || "", GET_USER_ORDERS.loc?.source.body as string);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">تاریخچه سفارشات</h1>
        <p className="mt-2 text-gray-500">لیست تمام سفارشات شما در یک نگاه</p>
      </div>

      <div className="space-y-5">
        {res.data.getUserOrders.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white py-12 text-center shadow-sm">
            <p className="text-lg text-gray-500">هنوز سفارشی ثبت نکرده‌اید</p>
            <Link href="/products" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          res.data.getUserOrders.map((order) => (
            <div key={order.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
              <div className="flex flex-col items-start justify-between gap-3 bg-gray-50 p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <FiClock className="text-primary-500 min-w-[20px]" />
                  <span className="text-sm text-gray-600">{formatJalaliDate(order.createdAt)}</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
                  <FiDollarSign className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">{order.totalPrice.toLocaleString()} تومان</span>
                </div>

                <Link href={`/account/orders/${order.id}`} className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm transition-colors">
                  جزئیات سفارش
                  <FiArrowLeft className="text-xs" />
                </Link>
              </div>

              <div className="p-4">
                <div className="xs:grid-cols-3 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {order.items.slice(0, 6).map((item, index) => (
                    <div key={`${order.id}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="w-full truncate text-center text-xs text-white">{item.product.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show more indicator if there are more items */}
                {order.items.length > 6 && <div className="mt-3 text-center text-sm text-gray-500">+ {order.items.length - 6} مورد دیگر</div>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserOrdersPage;
