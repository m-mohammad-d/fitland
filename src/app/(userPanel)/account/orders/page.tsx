import { GET_USER_ORDERS } from "@/graphql/queries/orderQueries";
import { formatJalaliDate } from "@/lib/Date";
import { graphQLFetch } from "@/lib/graphqlFetch";
import { GetUserOrdersResponse } from "@/types/Order";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiDollarSign, FiArrowLeft } from "react-icons/fi";

async function UserOrdersPage() {
  const res = await graphQLFetch<GetUserOrdersResponse>(
    process.env.NEXT_PUBLIC_BACKEND_URL || "",
    GET_USER_ORDERS.loc?.source.body as string
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          تاریخچه سفارشات
        </h1>
        <p className="text-gray-500 mt-2">لیست تمام سفارشات شما در یک نگاه</p>
      </div>

      <div className="space-y-5">
        {res.data.getUserOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">هنوز سفارشی ثبت نکرده‌اید</p>
            <Link
              href="/products"
              className="mt-4 inline-block text-primary-600 hover:text-primary-700"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          res.data.getUserOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-gray-50">
                <div className="flex items-center gap-2">
                  <FiClock className="text-primary-500 min-w-[20px]" />
                  <span className="text-sm text-gray-600">
                    {formatJalaliDate(order.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200">
                  <FiDollarSign className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {order.totalPrice.toLocaleString()} تومان
                  </span>
                </div>

                <Link
                  href={`/account/orders/${order.id}`}
                  className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
                >
                  جزئیات سفارش
                  <FiArrowLeft className="text-xs" />
                </Link>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {order.items.slice(0, 6).map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      <div className="absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs truncate w-full text-center">
                          {item.product.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show more indicator if there are more items */}
                {order.items.length > 6 && (
                  <div className="mt-3 text-center text-sm text-gray-500">
                    + {order.items.length - 6} مورد دیگر
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserOrdersPage;
